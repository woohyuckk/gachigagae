import { LikePlaceButton } from '../../buttons/LikeButton';
import KaKaoMap from '../KaKaoMap';
import PlaceInfo from './PlaceInfo';

const PlaceSection = ({ handleModalOpen: openModal, placeInfo }) => {
  const {
    coordinates: { latitude, longitude },
    image,
  } = placeInfo;

  return (
    <div className="w-full md:w-2/3 min-h-[850px] flex flex-col bg-white shadow-lg p-6 border-2 rounded-2xl ">
      <div className="flex border-b-2 items-center justify-between">
        <h1 className="text-2xl font-bold p-2 text-gray-800">{placeInfo.title}</h1>
        <LikePlaceButton size={30} isLiked={placeInfo.is_liked} placeId={placeInfo.id} />
      </div>
      {/* 카테고리 */}
      <div className="flex gap-2 mt-2  ">
        <span className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
          #{placeInfo.category2}
        </span>
      </div>

      {/* 대표 이미지 */}
      <div className="mt-4 flex justify-center">
        <img
          src={image}
          alt="/public/default-image.png"
          className="w-full h-[400px] object-cover rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => openModal(image)}
        />
      </div>

      {/* 상세 정보 */}
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        {/* 지도 */}
        <KaKaoMap latitude={latitude} longitude={longitude} placeInfo={placeInfo} />
        {/* 정보 텍스트 */}
        <PlaceInfo placeInfo={placeInfo} />
      </div>
    </div>
  );
};

export default PlaceSection;
