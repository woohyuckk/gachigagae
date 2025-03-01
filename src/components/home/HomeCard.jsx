import utils from '../../libs/utils/homeUtils';
import { LikePlaceButton } from '../buttons/LikeButton';

const HomeCard = ({ place }) => {
  const { id, title, category1, category2, address, image, isLiked } = place;

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
          }}
        >
          {category2}
        </span>
        <LikePlaceButton placeId={id} isLiked={isLiked} />
      </div>
    </>
  );
};

export default HomeCard;
