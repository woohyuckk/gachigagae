import HomeCardContainer from '../components/home/HomeCardContainer';
import useGetPlaces from '../libs/hooks/useGetPlaces';
import useAuthStore from '../stores/useAuthstore';

const Home = () => {
  const {
    userInfo: { id: userId },
  } = useAuthStore();
  const { data, isLoading } = useGetPlaces(userId);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HomeCardContainer places={data} />
    </>
  );
};

export default Home;
