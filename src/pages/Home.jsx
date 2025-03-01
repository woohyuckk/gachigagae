import HomeCardContainer from '../components/home/HomeCardContainer';
import useGetPlaces from '../libs/hooks/useGetPlaces';

const Home = () => {
  const userId = 'Temp Data';
  const { data, isLoading } = useGetPlaces(userId);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HomeCardContainer places={data} />
    </>
  );
};

export default Home;
