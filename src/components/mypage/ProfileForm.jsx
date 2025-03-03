// ProfileForm.jsx
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function ProfileForm({ formData, setFormData, isSubmitting }) {
  // 닉네임 입력 시, formData 업데이트
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, newNickname: e.target.value }));
  };

  return (
    <div className="space-y-8">
      {/* 닉네임 입력 필드 */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold ml-1 text-gray-600 tracking-wide">
          닉네임 : {formData.myNickname}
        </label>
        <div className="relative">
          <input
            type="text"
            name="newNickname"
            value={formData.newNickname ?? ''}
            onChange={handleInputChange}
            placeholder="닉네임을 입력해주세요."
            min={1}
            required
            className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-gray-400/80"
          />
          <CheckCircle2
            className={`w-6 h-6 text-emerald-500 absolute right-4 top-4 transition-opacity duration-200 ${
              formData.newNickname.length ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              프로필 변경중...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-180" />
              프로필 업데이트
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
