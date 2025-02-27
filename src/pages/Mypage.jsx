import { useEffect, useRef, useState } from 'react';
import { supabase } from '../libs/api/supabaseClient';

const Mypage = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    myNickname: '',
    nickname: '',
    userId: '',
    imagePreview: '',
    file: '',
    oldFilePath: '',
  });

  // 파일 입력 필드 접근을 위한 ref
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  // 유저 아이디 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return console.error('사용자 정보를 가져오는 데 실패:', error.message);
      }
      setFormData((prev) => ({
        ...prev,
        userId: data.user?.id,
      }));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // userId가 없으면 실행하지 않음
    if (!formData.userId) return;

    // 유저 정보 가져오기
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', formData.userId)
        .single();

      if (error) {
        console.error('데이터 로드 실패:', error);
        return;
      }

      // 스토리지에서 이미지 파일 다운로드해서 가져오기
      if (data?.profile_image_url) {
        try {
          const imagePath = data.profile_image_url.split('/public/').pop();
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('profile-images')
            .download(`public/${imagePath}`);

          if (downloadError) throw downloadError;

          const file = new File([fileData], imagePath, {
            type: fileData.type,
            lastModified: new Date().getTime(),
          });

          // 가져온 데이터로 변경하기
          setFormData((prev) => ({
            ...prev,
            imagePreview: URL.createObjectURL(file),
            file: file,
            nickname: data.nickname,
            myNickname: data.nickname,
            oldFilePath: data.profile_image_url,
          }));
        } catch (err) {
          console.error('데이터 가져오기 실패:', err);
        }
      } else {
        // 가져온 데이터로 변경하기
        setFormData((prev) => ({
          ...prev,
          nickname: data.nickname,
          myNickname: data.nickname,
        }));
      }
    };

    fetchUserData();
  }, [formData.userId]);

  // 입력 필드 핸들러
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nickname: value,
    }));
  };

  // 이미지 url 가져오기
  const getImageUrl = (imageName) => {
    return `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/profile-images/public/${imageName}`;
  };

  // 이미지 파일 변경 핸들러 수정
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      // 파일 선택 취소 시 기존 이미지 유지
      setFormData((prev) => ({ ...prev, file: prev.file }));
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('50MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    setFormData((prev) => ({ ...prev, file: selectedFile }));
    if (selectedFile.type.startsWith('image/')) {
      const fileURL = URL.createObjectURL(selectedFile);
      setFormData((prev) => ({ ...prev, imagePreview: fileURL }));
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, file: null, imagePreview: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 이미지 URL 메모리 해제
  useEffect(() => {
    return () => {
      if (formData.imagePreview) URL.revokeObjectURL(formData.imagePreview);
    };
  }, [formData.imagePreview]);

  // 업데이트 버튼 클릭시 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nickname, userId, file, oldFilePath } = formData;

    // 스토리지 이미지 업로드
    let fileUrl = oldFilePath;
    // 새 파일이 업로드된 경우
    if (file instanceof File) {
      const fileExtension = file.name.split('.').pop();
      const filePath = `uploads/${Date.now()}.${fileExtension}`;

      // 기존 이미지 삭제 (이 부분을 새 파일 업로드 전으로 이동)
      if (oldFilePath) {
        await supabase.storage
          .from('profile-images')
          .remove([`public/uploads/${oldFilePath.split('uploads/')[1]}`]);
      }

      // 새 이미지 업로드
      const { error } = await supabase.storage
        .from('profile-images')
        .upload(`public/${filePath}`, file);

      if (error) throw error;
      fileUrl = getImageUrl(filePath);
    }
    // 파일 삭제된 경우 (이 조건문을 별도로 분리)
    else if (file === null) {
      // 기존 이미지 삭제
      await supabase.storage
        .from('profile-images')
        .remove([`public/uploads/${oldFilePath.split('uploads/')[1]}`]);
      fileUrl = null;
    }

    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ nickname, profile_image_url: fileUrl })
      .eq('id', userId);

    if (error) {
      if (error.code === '23505') {
        alert('중복된 닉네임이 있습니다.');
      } else {
        alert('업데이트에 실패했습니다. 다시 시도해주세요.');
        console.error('업데이트 실패:', error.message);
      }
      return;
    }
    alert('프로필이 성공적으로 업데이트되었습니다!');
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-primary-color mb-6">프로필 수정</h1>
          <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="inputFile">
                프로필 이미지
                <input
                  type="file"
                  id="inputFile"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
                <div>
                  {formData.imagePreview ? (
                    <>
                      <img src={formData.imagePreview} alt="이미지 미리보기" />
                      <button onClick={handleRemoveImage}>×</button>
                    </>
                  ) : (
                    <div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <path d="M17 21v-8H7v8M12 7v6M9 10h6" />
                      </svg>
                    </div>
                  )}
                </div>
              </label>
            </div>
            <label className="p-2">닉네임 : {formData.myNickname}</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="닉네임"
              required
              className="w-full p-4 border border-gray-300 rounded-lg mt-2"
            />
            <button className="rounded-full w-full bg-blue-500 text-white py-3 hover:bg-secondary-color transition duration-300 hover:bg-blue-600">
              프로필 업데이트
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mypage;
