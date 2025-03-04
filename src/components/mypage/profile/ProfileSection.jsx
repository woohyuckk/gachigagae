import { useState, useEffect } from 'react';
import { supabase } from '../../../libs/api/supabaseClient';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileForm from './ProfileForm';
import { toast } from 'react-toastify';
import { TOAST_MSG } from '../../../constants/toastMessages';

const DEFAULT_IMAGE = '/public/user2.png';

export default function ProfileSection({ userInfo, setUserInfo }) {
  // Submit 버튼 클릭 시, 중복을 방지하기 위한 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 프로필 업데이트 폼 데이터
  const [formData, setFormData] = useState({
    newNickname: '',
    imagePreview: userInfo.profile_img_url || DEFAULT_IMAGE,
    file: null,
    oldFilePath: userInfo.profile_img_url ?? null,
    myNickname: userInfo.nickname,
  });

  // user정보를 불러와 formData에 반영
  useEffect(() => {
    if (userInfo !== null) {
      setFormData({
        newNickname: userInfo.nickname,
        imagePreview: userInfo.profile_img_url || DEFAULT_IMAGE,
        file: null,
        oldFilePath: userInfo.profile_img_url ?? null,
        myNickname: userInfo.nickname,
      });
    }
  }, [userInfo]);

  // 엔터 키 눌림 방지 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 키 기본 동작(폼 제출)을 막음
    }
  };

  // 프로필 업데이트 요청
  const handleSubmit = async (newNickname, file) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let fileUrl = formData.oldFilePath;

      if (file) {
        fileUrl = await uploadNewImage(file);
        if (!fileUrl) throw new Error('이미지 업로드 실패');

        if (formData.oldFilePath && !(await removeOldImage(formData.oldFilePath))) {
          throw new Error('기존 이미지 삭제 실패');
        }
      }

      if (!file && formData.imagePreview === DEFAULT_IMAGE) {
        const success = await removeOldImage(formData.oldFilePath);
        if (!success) throw new Error('기존 이미지 삭제 실패');
        fileUrl = null;
      }

      const { error } = await supabase
        .from('users')
        .update({ nickname: newNickname, profile_img_url: fileUrl })
        .eq('id', userInfo.id);

      if (error) throw new Error('업데이트에 실패했습니다.');

      setUserInfo({ nickname: newNickname, profile_img_url: fileUrl });
      setFormData((prev) => ({ ...prev, newNickname: '' }));
      toast(TOAST_MSG.PROFILE_UPDATE);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 새 이미지 스토리지 업로드
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

  // 기존이미지 스토리지 삭제
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

  return (
    <div className="w-full max-w-xl mx-auto border-2 rounded-2xl shadow-2xl transition-all hover:shadow-3xl hover:-translate-y-1.5">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-4xl max-md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-5 text-center">
          프로필 업데이트
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData.newNickname, formData.file);
          }}
          onKeyDown={handleKeyDown}
        >
          <ProfileImageUpload formData={formData} setFormData={setFormData} />
          <ProfileForm formData={formData} setFormData={setFormData} />
        </form>
      </div>
    </div>
  );
}
