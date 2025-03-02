import KaKaoMap from './KaKaoMap';

const PlaceSection = ({ handleModalOpen: openModal, placeInfo }) => {
  const description = placeInfo.description.split('|');
  const [open, close, parking, isAccompanied, exeption] = description;

  const {
    coordinates: { latitude, longitude },
  } = placeInfo;

  return (
    <div className="w-full md:w-2/3 min-h-[850px] flex flex-col bg-white rounded-xl shadow-lg p-6 border border-gray-200">
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
      <div className="mt-4 flex justify-center">
        <img
          src="/public/default-image.png"
          alt="default-image"
          className="w-full md:w-1/2  object-cover rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => openModal('/public/default-image.png')}
        />
      </div>

      {/* 상세 정보 */}
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        {/* 썸네일 */}
        <div className="w-full md:w-1/2 h-72 ">
          <KaKaoMap latitude={latitude} longitude={longitude} />
        </div>

        {/* 정보 텍스트 */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 text-grey">
          <p>⏰ {open}</p>
          <p>🚪 {close}</p>
          <p>📍 {placeInfo.address}</p>
          <p>📞 전화번호:{placeInfo.tel || '❌'}</p>
          <p>💡 {isAccompanied}</p>
          <p>⚠️ {exeption}</p>
          <p>🚗 {parking}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceSection;
