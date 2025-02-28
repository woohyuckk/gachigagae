import utils from '../../libs/utils/homeUtils';
import LikeButton from '../buttons/LikeButton';

const HomeCard = ({ place, onClick }) => {
  const { title, category1, category2, address, image, isLiked } = place;

  // * 좋아요 버튼 클릭 리스너
  const handleClickLikeButton = () => {
    console.log('좋아요 클릭!');
  };

  return (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-400 text-xs w-full">{utils.splitAddress(address)}</p>
      <figure className="flex flex-auto justify-center items-center rounded-2xl bg-gray-100 xl:w-full h-3/4">
        {image ? (
          <img className="object-cover w-full h-full" src="" alt="" />
        ) : (
          <div> No image </div>
        )}
      </figure>
      <div className="w-full flex">
        <span className="text-gray-500 text-sm">#{category1} #</span>
        <span
          className="text-gray-500 text-sm cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
        >
          {category2}
        </span>
        <LikeButton size={24} status={isLiked} onClick={handleClickLikeButton} />
      </div>
    </>
  );
};

export default HomeCard;
