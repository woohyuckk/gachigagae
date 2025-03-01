const CommentUserProfile = ({ userProfileImage, nickname }) => {
  const profileImage =
    'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740';

  return (
    <div className="flex items-center space-x-2 min-w-0">
      <img
        src={userProfileImage || profileImage}
        alt="Profile"
        className="w-8 h-8 rounded-full border border-gray-300 "
      />
      <span className="font-bold text-black truncate max-w-[150px]">{nickname}</span>
    </div>
  );
};

export default CommentUserProfile;
