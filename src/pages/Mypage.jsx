import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthstore';
import MyPageTapButton from '../components/buttons/MyPageTapButton';
import MypageContent from '../components/mypage/MypageContent';
import Loading from '../components/common/Loading';

const Mypage = () => {
  const { userInfo, setUserInfo } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = useCallback((tab) => setActiveTab(tab), []);

  const isLoading = !userInfo || Object.values(userInfo).every((value) => value === '');

  if (isLoading) {
    return <Loading notification="정보를 불러오는 중입니다." />;
  }

  return (
    <div className="from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
        {/* 탭 네비게이션 */}
        <MyPageTapButton activeTab={activeTab} onChangeTab={handleTabChange} />

        {/* 선택된 탭의 내용 렌더링 */}
        <MypageContent
          activeTab={activeTab}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Mypage;
