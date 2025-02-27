const Comment = () => {
  const profileImage = 'https://example.com/user-profile.jpg';
  return (
    <div className="flex flex-col  p-2 bg-purple-200 rounded-xl w-full border-b border-gray-400">
      {/* 프로필 이미지 및 닉네임 */}
      <div className="flex w-full items-center space-x-2 border-b-2">
        <img
          src={profileImage || 'https://via.placeholder.com/40'} // 기본 이미지
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
        <span className="font-bold text-black">NICKNAME</span>
      </div>
      <p>댓글</p>
    </div>
  );
};

export default Comment;
