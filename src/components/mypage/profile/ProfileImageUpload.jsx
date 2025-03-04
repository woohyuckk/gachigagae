import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { toast } from 'react-toastify';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const DEFAULT_IMAGE = '/public/user2.png';

export default function ProfileImageUpload({ formData, setFormData }) {
  const fileInputRef = useRef(null);

  // 파일 선택 시 이벤트 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast('50MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file: selectedFile,
      imagePreview: URL.createObjectURL(selectedFile),
    }));
  };

  // 이미지 삭제 버튼 클릭 시 이벤트 핸들러
  const handleRemoveImage = (e) => {
    e.preventDefault();
    resetFileInput();
    setFormData((prev) => ({ ...prev, file: null, imagePreview: DEFAULT_IMAGE }));
  };

  // 파일 인풋 초기화
  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="group relative mx-auto w-fit">
      <label className="cursor-pointer block">
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="relative inline-block w-full h-60 max-md:h-48">
          <img
            src={formData.imagePreview || DEFAULT_IMAGE}
            alt="이미지 미리보기"
            className="w-full h-60 max-md:h-48 rounded-lg object-contain border-2"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <Camera className="w-8 h-8 text-white/90" />
            <span className="text-white font-semibold text-sm">이미지 변경</span>
          </div>
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
  );
}
