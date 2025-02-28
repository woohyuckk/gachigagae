import { useEffect, useRef, useState } from 'react';
import { supabase } from '../libs/api/supabaseClient';
import useAuthStore from '../stores/useAuthstore';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const DEFAULT_IMAGE = '/public/user2.png';

const Mypage = () => {
  const { userInfo, setUserInfo } = useAuthStore();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({
    newNickname: '',
    imagePreview: '',
    file: null,
    oldFilePath: '',
  });

  // userInfo 변경 시 상태 초기화
  useEffect(() => {
    if (userInfo) {
      setFormData({
        newNickname: userInfo.nickname,
        imagePreview: userInfo.profile_img_url || DEFAULT_IMAGE,
        file: null,
        oldFilePath: userInfo.profile_img_url || '',
      });
    }
  }, [userInfo]);

  // 입력 핸들러
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, newNickname: e.target.value }));
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('50MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file: selectedFile,
      imagePreview: URL.createObjectURL(selectedFile),
    }));
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = (e) => {
    e.preventDefault();
    resetFileInput();
    setFormData((prev) => ({ ...prev, file: null, imagePreview: DEFAULT_IMAGE }));
  };

  // 파일 입력 필드 초기화
  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 기존 이미지 삭제
  const removeOldImage = async (oldFilePath) => {
    if (!oldFilePath) return true;
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

  // 새 이미지 업로드
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

  // 프로필 업데이트
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { newNickname, file, oldFilePath } = formData;
      let fileUrl = oldFilePath;

      // 새 이미지 업로드
      if (file) {
        fileUrl = await uploadNewImage(file);
        if (!fileUrl) throw new Error('이미지 업로드 실패');

        if (oldFilePath && !(await removeOldImage(oldFilePath))) {
          throw new Error('기존 이미지 삭제 실패');
        }
      }

      // 기존 이미지 삭제된 경우
      if (!file && oldFilePath) {
        const success = await removeOldImage(oldFilePath);
        if (!success) throw new Error('기존 이미지 삭제 실패');
        fileUrl = null;
      }

      const { error } = await supabase
        .from('users')
        .update({ nickname: newNickname, profile_img_url: fileUrl })
        .eq('id', userInfo.id);

      if (error) throw new Error('업데이트에 실패했습니다.');

      setUserInfo({ nickname: newNickname, profile_img_url: fileUrl });
      alert('프로필이 성공적으로 업데이트되었습니다!');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">프로필 수정</h1>
        <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {/* 이미지 업로드 */}
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
                <img
                  src={formData.imagePreview}
                  alt="이미지 미리보기"
                  className="w-full h-60 rounded-lg border-2 border-gray-300 object-contain"
                />
                {formData.imagePreview !== DEFAULT_IMAGE && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70"
                  >
                    ×
                  </button>
                )}
              </div>
            </label>
          </div>

          {/* 닉네임 입력 */}
          <label className="p-2">현재 닉네임: {userInfo.nickname}</label>
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

          {/* 제출 버튼 */}
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
