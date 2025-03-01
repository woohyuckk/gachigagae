import HomeCardContainer from '../components/home/HomeCardContainer';
import { usePlacesWithLiked } from '../libs/hooks/useLikes';

const Home = () => {
  const userId = 'temp Data';

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
