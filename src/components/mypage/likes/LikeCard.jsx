import utils from '../../../libs/utils/homeUtils';

const LikeCard = ({ place, onClick, ref }) => {
  const { title, category2, address, image } = place;

  return (
    <div className="h-full" ref={ref}>
      <h2 className="text-lg md:text-2xl font-bold">{title}</h2>
      <p className="text-gray-400 text-sm md:text-lg w-full my-1">{utils.splitAddress(address)}</p>
      <figure className="flex flex-auto justify-center items-center rounded-2xl h-7/10 bg-gray-100 xl:w-full xl:h-3/4">
        {image ? (
          <img className="object-cover w-full h-full border-2 border-solid" src={image} alt="" />
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
          className="text-gray-500 text-lg cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
        >
          {category2}
        </span>
      </div>
    </div>
  );
};

export default LikeCard;
