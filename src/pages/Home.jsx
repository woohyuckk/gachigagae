import HomeCardContainer from '../components/common/home/HomeCardContainer';
import SideBar from '../components/common/home/SideBar';
import useGetPlaces from '../libs/mutations/useGetPlaces';

const Home = () => {
  const { places, isLoading, error } = useGetPlaces();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  // console.log(places);
  return (
    <>
      <HomeCardContainer places={places} />
      <SideBar />
    </>
  );
};

export default Home;
