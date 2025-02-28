import HomeCardContainer from '../components/home/HomeCardContainer';
import useGetPlaces from '../libs/hooks/useGetPlaces';
import useGetLikes from '../libs/hooks/useGetLikes';
import { useMemo } from 'react';
import useAuthStore from '../stores/useAuthstore';

const Home = () => {
  const userId = useAuthStore((state) => state.userInfo.id);

  // 장소 및 좋아요 목록 불러오기
  const { getPlaces, isLoading: isLoadingPlacesData, error: placesError } = useGetPlaces();
  const { likeList, isLoading: isLoadingLikesData, error: likesError } = useGetLikes(userId);

  // 불러온 장소 목록에 좋아요 여부 속성 추가
  const placesWithLikeStuats = useMemo(() => {
    if (!getPlaces || !likeList) return [];

    return getPlaces.map((place) => ({
      ...place,
      isLiked: likeList.some((likePlace) => likePlace.place_id === place.id),
    }));
  }, [getPlaces, likeList]);

  if (isLoadingPlacesData || isLoadingLikesData) return <div>loading...</div>;
  if (placesError || likesError) return <div>error</div>;

  return (
    <>
      <HomeCardContainer getPlaces={placesWithLikeStuats} />
    </>
  );
};

export default Home;
