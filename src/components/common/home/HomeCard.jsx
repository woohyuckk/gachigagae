const HomeCard = ({ title, category2, address, image }) => {
  return (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-400 text-xs w-full">{address}</p>
      <figure className="flex flex-auto justify-center items-center rounded-2xl bg-gray-100 xl:w-full h-3/4">
        {image ? <img className="object-cover w-full h-full" src="" alt="" /> : <div > No image </div>}
      </figure>
      <span className="text-gray-500 text-sm">{category2}</span>
    </>
  );
};

export default HomeCard;
