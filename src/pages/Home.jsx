import HomeCardContainer from '../components/home/HomeCardContainer';
import useGetPlaces from '../libs/hooks/useGetPlaces';

const Home = () => {
  const { getPlaces, isLoading, error } = useGetPlaces();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <HomeCardContainer getPlaces={getPlaces} />
    </>
  );
};

export default Home;
