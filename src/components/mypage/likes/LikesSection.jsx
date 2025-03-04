import { Heart } from 'lucide-react';
import useGetPlaces from '../../../libs/hooks/useGetPlaces';
import LikesList from '../likes/LikesList';
import Loading from '../../common/Loading';

export default function LikesSection({ userInfo, navigate }) {
  // * 장소 목록을 불러오기 위한 useGetPlaces 훅
  const { data, isLoading } = useGetPlaces(userInfo?.id, null);

  if (isLoading) {
    return <Loading notification="정보를 불러오는 중입니다." />;
  }

  // * 좋아요한 장소만 필터링
  const placeFiltered = data?.filter((place) => place.is_liked === true) || [];

  return (
    <div className="w-full px-4 md:px-0">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 md:mb-8 flex items-center gap-1 md:gap-2">
        <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
        좋아요 한 장소
        <span className="text-blue-500/90 text-xl md:text-2xl">({placeFiltered.length})</span>
      </h2>
      <LikesList places={placeFiltered} navigate={navigate} />
    </div>
  );
}
