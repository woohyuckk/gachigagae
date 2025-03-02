import { useSearchParams } from 'react-router-dom';
import HomeCardContainer from '../components/home/HomeCardContainer';
import useGetPlaces from '../libs/hooks/useGetPlaces';
import useAuthStore from '../stores/useAuthstore';

const Home = () => {
  const {
    userInfo: { id: userId },
  } = useAuthStore();
  const [searchParams] = useSearchParams();

  // 쿼리스트링에 따라 데이터 다르게 가져오기
  const category = searchParams.get('category');
  const { data, isLoading } = useGetPlaces(userId, category);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <HomeCardContainer places={data} />
    </>
  );
};

export default Home;
