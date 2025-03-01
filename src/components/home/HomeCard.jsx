import utils from '../../libs/utils/homeUtils';

const HomeCard = ({ place, onClick, text, ref, inView }) => {
  const { title, category1, category2, address, image } = place;

  return (
    <div className="h-full" ref={ref}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-400 text-xs w-full">{utils.splitAddress(address)}</p>
      <figure className="flex flex-auto justify-center items-center rounded-2xl bg-gray-100 xl:w-full h-3/4">
        {image ? (
          <img className="object-cover w-full h-full" src="" alt="" />
        ) : (
          <div> No image </div>
        )}
      </figure>
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
    </div>
  );
};

export default HomeCard;
