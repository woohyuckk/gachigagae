const Comment = ({ comment }) => {
  const profileImage =
    'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740';
  return (
    <div className="flex flex-col   p-2 bg-purple-200 rounded-xl w-full border-b border-gray-400 my-1.5">
      {/* 프로필 이미지 및 닉네임 */}
      <div className="flex w-full items-center space-x-2 border-b p-1">
        <img
          src={
            profileImage ||
            'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740'
          } // 기본 이미지
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
        <span className="font-bold text-black">NICKNAME</span>
      </div>
      <div className="w-full overflow-hidden ">
        <span className="whitespace-pre-wrap break-words">{comment}</span>
      </div>
    </div>
  );
};

export default Comment;
