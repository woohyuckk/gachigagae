import HomeCardContainer from '../components/home/HomeCardContainer';
import usePlacesWithLiked from '../libs/hooks/usePlacesWithLiked';

const Home = () => {
  // const userId = useAuthStore((state) => state.userInfo.id);
  const userId = '8037c1da-7723-4147-b7ad-a7a5a9be2a55';

  // 장소 목록 불러오기
  const { placesWithLikeStuats, isLoading } = usePlacesWithLiked(userId);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HomeCardContainer getPlaces={placesWithLikeStuats} />
    </>
  );
};

export default Home;
