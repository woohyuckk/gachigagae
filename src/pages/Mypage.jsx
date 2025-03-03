import { useState } from 'react';
import useAuthStore from '../stores/useAuthstore';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../components/mypage/ProfileSection';
import LikesSection from '../components/mypage/LikesSection';

const Mypage = () => {
  const { userInfo, setUserInfo } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className=" from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
        {/* 탭 네비게이션 */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            프로필 업데이트
          </button>
          <button
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              activeTab === 'likes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('likes')}
          >
            좋아요 목록
          </button>
        </div>

        {/* 선택된 탭의 내용 렌더링 */}
        {activeTab === 'profile' && (
          <div className="w-full max-w-xl mx-auto">
            <ProfileSection userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            <LikesSection userInfo={userInfo} navigate={navigate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypage;
