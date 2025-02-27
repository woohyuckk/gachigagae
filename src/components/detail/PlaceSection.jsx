const PlaceSection = ({ handleModalOpen: openModal, placeInfo }) => {
  const description = placeInfo.description.split('|');
  // const descriptionObject = description.reduce((acc, res) => {
  //   const [name, value] = res.split(' : ');
  //   acc[name] = value;
  //   return acc;
  // }, {});
  // console.log(descriptionObject);
  console.log(description);
  console.log(placeInfo);
  const [open, close, parking, isAccompanied, exption] = description;

  return (
    <div className="w-full md:w-2/3 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">{placeInfo.title}</h1>

      {/* 카테고리 */}
      <div className="flex gap-2 mt-2">
        <span className="bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full">
          {placeInfo.category1}
        </span>
        <span className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
          {placeInfo.category2}
        </span>
      </div>

      {/* 대표 이미지 */}
      <div className="mt-4 flex">
        <img
          src="/public/default-image.png"
          alt="default-image"
          className="w-1/2 mx-auto aspect-square object-contain rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => openModal('/public/default-image.png')}
        />
      </div>

      {/* 상세 정보 */}
      <div className="mt-4 flex gap-4">
        {/* 썸네일 */}
        <div className="w-1/2 h-72">
          <img
            src="/public/default-image.png"
            alt="default-image"
            className="w-full h-full object-cover rounded-lg shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
          />
        </div>

        {/* 정보 텍스트 */}
        <div className="flex flex-col gap-2 text-gray-700">
          <p>⏰ {open}</p>
          <p>🚪 {close}</p>
          <p>📍 {placeInfo.address}</p>
          <p>📞 전화번호:{placeInfo.tel || '❌'}</p>
          <p>💡 {isAccompanied}</p>
          <p>⚠️ {exption}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceSection;
