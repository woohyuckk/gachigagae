import HomeCard from '../../home/HomeCard';
import KaKaoMap from '../../detail/KaKaoMap';
import homeUtils from '../../../libs/utils/homeUtils';

export default function LikeItem({ place, navigate }) {
  return (
    <article className="w-full md:w-[420px] flex-shrink-0 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:shadow-xl md:hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 md:hover:-translate-y-3 relative group h-[480px] md:h-[580px]">
      <HomeCard
        place={place}
        className="h-full flex flex-col"
        imageStyle="h-48 md:h-72 object-cover rounded-t-xl md:rounded-t-2xl"
        contentStyle="p-4 md:p-6 flex-1 space-y-2 md:space-y-4"
      />
      {/* 모바일 터치 대응 오버레이 */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 md:p-8">
        <div className="space-y-2">
          <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{place.title}</h3>
        </div>
        <div className="flex-1 min-h-[120px]">
          <div className="w-full h-full">
            <KaKaoMap
              latitude={place.coordinates.latitude}
              longitude={place.coordinates.longitude}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-200 text-sm md:text-lg line-clamp-2">{place.description}</p>
        </div>
        <button
          onClick={() => homeUtils.handleGoToDetail(place.id, navigate)}
          className="w-full py-2 md:py-2 bg-white/10 backdrop-blur-lg rounded-lg md:rounded-xl text-white hover:bg-white/20 transition-colors text-base md:text-xl"
        >
          상세보기
        </button>
      </div>
    </article>
  );
}
