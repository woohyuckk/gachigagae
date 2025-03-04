import ProfileSection from '../mypage/profile/ProfileSection';
import LikesSection from '../mypage/likes/LikesSection';

const MypageContent = ({ activeTab, userInfo, setUserInfo, navigate }) => {
  return (
    <div>
      {activeTab === 'profile' ? (
        <div className="w-full max-w-xl mx-auto">
          <ProfileSection userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <LikesSection userInfo={userInfo} navigate={navigate} />
        </div>
      )}
    </div>
  );
};

export default MypageContent;
