import utils from '../../libs/utils/homeUtils';
import { LikePlaceButton } from '../buttons/LikeButton';

const HomeCard = ({ place, onClick, ref }) => {
  const { id, title, category2, address, image, is_liked } = place;

  return (
    <div className="h-full" ref={ref}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-400 w-full my-1 text-sm">{utils.splitAddress(address)}</p>
      <figure className="flex flex-auto justify-center items-center rounded-2xl bg-gray-100 h-3/4">
        {image ? (
          <img className="object-cover w-full h-full" src={image} alt="" />
        ) : (
          <div> No image </div>
        )}
      </figure>

      <div
        className="w-full flex p-1 items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          className="text-gray-500 text-sm cursor-pointer md:text-base"
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
        >
          {category2}
        </span>
        <LikePlaceButton placeId={id} isLiked={is_liked} className="ml-auto" />
      </div>
    </div>
  );
};

export default HomeCard;
