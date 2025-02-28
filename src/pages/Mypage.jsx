import { useEffect, useRef, useState } from 'react';
import { supabase } from '../libs/api/supabaseClient';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const Mypage = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    myNickname: '',
    newNickname: '',
    userId: '',
    imagePreview: '',
    file: null,
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
        console.error('사용자 정보를 가져오는 데 실패:', error.message);
        return;
      }
      setFormData((prev) => ({ ...prev, userId: data.user?.id }));
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
        myNickname: data.nickname,
        oldFilePath: data.profile_img_url,
      }));
    };

    fetchUserData();
  }, [formData.userId]);

  // 입력 필드 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 파일 변경 핸들러 수정
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

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

  // 기존 이미지 제거 핸들러
  const removeOldImage = async (oldFilePath) => {
    const oldFileName = oldFilePath.split('uploads/')[1];
    const { error } = await supabase.storage
      .from('profile-images')
      .remove([`public/uploads/${oldFileName}`]);

    if (error) {
      console.error('기존 이미지 삭제 실패:', error.message);
      return false;
    }
    return true;
  };

  // 새로운 이미지 업로드
  const uploadNewImage = async (file) => {
    const fileExtension = file.name.split('.').pop();
    const filePath = `uploads/${Date.now()}.${fileExtension}`;
    const { error } = await supabase.storage
      .from('profile-images')
      .upload(`public/${filePath}`, file);

    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      return null;
    }
    return `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/profile-images/public/${filePath}`;
  };

  // 업데이트 버튼 클릭시 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 제출 중이면 return
    if (isSubmitting) return;
    setIsSubmitting(true);

    const { newNickname, userId, file, oldFilePath } = formData;

    let fileUrl = oldFilePath;

    if (file) {
      // 새 이미지 업로드
      const uploadedFileUrl = await uploadNewImage(file);
      if (!uploadedFileUrl) {
        setIsSubmitting(false);
        alert('이미지 업로드 실패');
        return;
      }

      fileUrl = uploadedFileUrl;

      // 기존 이미지 삭제
      if (oldFilePath && !(await removeOldImage(oldFilePath))) {
        setIsSubmitting(false);
        alert('기존 이미지 삭제 실패');
        return;
      }
    }

    // 파일 삭제된 경우
    if (file === null && oldFilePath) {
      const success = await removeOldImage(oldFilePath);
      if (!success) {
        setIsSubmitting(false);
        alert('기존 이미지 삭제 실패');
        return;
      }
      fileUrl = null;
    }

    const { error } = await supabase
      .from('users')
      .update({ nickname: newNickname, profile_img_url: fileUrl })
      .eq('id', userId);

    if (error) {
      setIsSubmitting(false);
      alert('업데이트에 실패했습니다. 다시 시도해주세요.');
      console.error('업데이트 실패:', error.message);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      myNickname: newNickname,
      oldFilePath: fileUrl,
    }));

    alert('프로필이 성공적으로 업데이트되었습니다!');
    setIsSubmitting(false);
  };

  return (
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
              <div className="relative inline-block w-full h-60">
                {formData.imagePreview ? (
                  <>
                    <img
                      src={formData.imagePreview}
                      alt="이미지 미리보기"
                      className="w-full h-60 rounded-lg border-2 border-gray-300 object-contain"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src="/public/user2.png"
                      alt="기본이미지"
                      className="w-full h-60 object-contain"
                    />
                  </>
                )}
              </div>
            </label>
          </div>
          <label className="p-2">닉네임 : {formData.myNickname}</label>
          <input
            type="text"
            name="newNickname"
            value={formData.newNickname}
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
  );
};

export default Mypage;
