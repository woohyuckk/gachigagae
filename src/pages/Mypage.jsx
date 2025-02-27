import { useEffect, useRef, useState } from 'react';
import { supabase } from '../libs/api/supabaseClient';

const MAX_FILE_SIZE = 50 * 1024 * 1024;

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

  // 제출 중 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 파일 입력 필드 접근을 위한 ref
  const fileInputRef = useRef(null);

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

      setFormData((prev) => ({
        ...prev,
        imagePreview: data.profile_img_url,
        nickname: data.nickname,
        myNickname: data.nickname,
        oldFilePath: data.profile_img_url,
      }));
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

  // 이미지 파일 변경 핸들러 수정
  const handleFileChange = (e) => {
    if (!selectedFile) return;

    const selectedFile = e.target.files[0];

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

    // 제출 중이면 return
    if (isSubmitting) return;

    setIsSubmitting(true); // 제출 중 상태로 변경
    const { nickname, userId, file, oldFilePath } = formData;

    // 스토리지 이미지 업로드
    let fileUrl = oldFilePath;
    // 새 파일이 업로드된 경우
    if (file instanceof File) {
      const fileExtension = file.name.split('.').pop();
      const filePath = `uploads/${Date.now()}.${fileExtension}`;

      // 새 이미지 업로드
      const { error } = await supabase.storage
        .from('profile-images')
        .upload(`public/${filePath}`, file);

      // 기존 이미지 삭제
      if (oldFilePath) {
        await supabase.storage
          .from('profile-images')
          .remove([`public/uploads/${oldFilePath.split('uploads/')[1]}`]);
      }

      if (error) throw error;
      fileUrl = `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/profile-images/public/${filePath}`;
    }
    // 파일 삭제된 경우 (이 조건문을 별도로 분리)
    if (file === null) {
      // 기존 이미지 삭제
      await supabase.storage
        .from('profile-images')
        .remove([`public/uploads/${oldFilePath.split('uploads/')[1]}`]);
      fileUrl = null;
    }

    const { error } = await supabase
      .from('users')
      .update({ nickname, profile_img_url: fileUrl })
      .eq('id', userId);

    if (error) {
      if (error.code === '23505') {
        alert('중복된 닉네임이 있습니다.');
      } else {
        alert('업데이트에 실패했습니다. 다시 시도해주세요.');
        console.error('업데이트 실패:', error.message);
      }
      setIsSubmitting(false); // 제출 중 상태 해제
      return;
    }

    setFormData((prev) => ({
      ...prev,
      myNickname: nickname,
    }));

    alert('프로필이 성공적으로 업데이트되었습니다!');
    setIsSubmitting(false); // 제출 중 상태 해제
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
                    <div className="relative inline-block">
                      <img
                        src={formData.imagePreview}
                        alt="이미지 미리보기"
                        className="w-full h-auto rounded-lg border-2 border-gray-300"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70"
                      >
                        ×
                      </button>
                    </div>
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
              minLength={1}
              required
              className="w-full p-4 border border-gray-300 rounded-lg mt-2"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-full w-full py-3 text-white transition duration-300 ${
                isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? '업데이트 중...' : '프로필 업데이트'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mypage;
