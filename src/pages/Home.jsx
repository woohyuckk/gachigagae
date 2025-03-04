import SideBar from '../components/home/SideBar';
import HomeCard from '../components/home/HomeCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../stores/useAuthstore';
import homeUtils from '../libs/utils/homeUtils';
import useInfinitePlaces from '../libs/hooks/useInfinitePlaces';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthStore((state) => state.userInfo);
  const [searchParams] = useSearchParams();
  // 쿼리스트링에 따라 데이터 다르게 가져오기
  const category = searchParams.get('category');

  const {
    data: places,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePlaces(category, userId);

  const { ref } = useInView({
    threshold: 0.7,
    triggerOnce: true,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  // * 카테고리 정렬 핸들러 함수
  const handleCategory = (e) => {
    const categoryName = e.target.innerText;
    homeUtils.handleCategoryMove(categoryName, navigate);
    homeUtils.scrollToTop();
  };

  return (
    <>
      <SideBar onClick={handleCategory} />
      <div className="flex flex-wrap gap-20 justify-evenly p-4">
        {places.pages.flat().map((place, idx) => {
          return (
            <article
              key={place.id}
              onClick={() => {
                homeUtils.handleGoToDetail(place.id, navigate);
              }}
              className={
                idx % 2 === 1
                  ? 'w-48 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col '
                  : 'w-48 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col lg:top-16  '
              }
            >
              {idx % 7 === 0 && idx !== 0 ? (
                <HomeCard place={place} onClick={handleCategory} ref={ref} />
              ) : (
                <HomeCard place={place} onClick={handleCategory} />
              )}
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Home;
