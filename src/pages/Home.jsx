import HomeCardContainer from '../components/home/HomeCardContainer';
import useGetPlaces from '../libs/hooks/useGetPlaces';
import useAuthStore from '../stores/useAuthstore';

const Home = () => {
  const {
    userInfo: { id: userId },
  } = useAuthStore();

  // 전체 게시물 데이터 가져오기
  const { data, isLoading } = useGetPlaces(userId);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HomeCardContainer places={data} />
    </>
  );
};

export default Home;
