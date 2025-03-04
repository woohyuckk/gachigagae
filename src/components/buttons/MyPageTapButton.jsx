import classNames from 'classnames';

const TABS = {
  PROFILE: 'profile',
  LIKES: 'likes',
};

const MyPageTapButton = ({ activeTab, onChangeTab }) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {Object.entries(TABS).map(([key, value]) => (
        <button
          key={key}
          className={classNames(
            'px-6 py-2 rounded-full text-lg font-semibold transition',
            activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          )}
          onClick={() => onChangeTab(value)}
        >
          {value === TABS.PROFILE ? '프로필 업데이트' : '좋아요 목록'}
        </button>
      ))}
    </div>
  );
};

export default MyPageTapButton;
