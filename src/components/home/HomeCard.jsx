import { useAddLikes, useDeleteLikes } from '../../libs/hooks/useLikes';
import utils from '../../libs/utils/homeUtils';
import LikeButton from '../buttons/LikeButton';

const HomeCard = ({ place, onClick }) => {
  const { id: placeId, title, category1, category2, address, image, isLiked } = place;

  const userId = 'temp Data';
  const addLikesMutation = useAddLikes();
  const deleteLikesMutation = useDeleteLikes();

  // * 좋아요 버튼 클릭 리스너
  const handleClickLikeButton = () => {
    if (!isLiked) {
      addLikesMutation.mutate({ userId, placeId });
    } else {
      deleteLikesMutation.mutate({ userId, placeId });
    }
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
