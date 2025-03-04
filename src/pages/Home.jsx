import SideBar from '../components/home/SideBar';
import HomeCard from '../components/home/HomeCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../stores/useAuthstore';
import homeUtils from '../libs/utils/homeUtils';
import useInfinitePlaces from '../libs/hooks/useInfinitePlaces';
import { useInView } from 'react-intersection-observer';
import HOME_CONSTANT from '../constants/homeConstant';

const Home = () => {
  const navigate = useNavigate();
  const userInfo = useAuthStore((state) => state.userInfo);
  const [searchParams] = useSearchParams();
  // 쿼리스트링에 따라 데이터 다르게 가져오기
  const category = searchParams.get('category');
  const searchValue = searchParams.get('search');

  const {
    data: places,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePlaces(category, userInfo.id, searchValue);

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
    const category = {
      전체보기: HOME_CONSTANT.CATEGORY_HOME,
      식당: HOME_CONSTANT.CATEGORY_RESTAURANT,
      카페: HOME_CONSTANT.CATEGORY_CAFE,
    };
    homeUtils.handleCategoryMove(category[categoryName], navigate);
    homeUtils.scrollToTop();
  };

  return (
    <div className="flex justify-center w-full">
      <SideBar onClick={handleCategory} />
      <div className="flex flex-wrap gap-15 justify-center p-4 w-[95%] max-w-[780px] my-25">
        {places.pages.flat().map((place, idx) => {
          return (
            <article
              key={place.id}
              onClick={() => {
                homeUtils.handleGoToDetail(place.id, navigate);
              }}
              className={`w-full xl:w-[calc(50%-2.5rem)] min-w-[300px] max-w-[350px] h-[450px] bg-white shadow-lg rounded-2xl border-2 overflow-hidden p-5 relative flex-col trasition-all duration-400 ease-in-out ${
                idx % 2 === 1 ? '' : 'xl:mt-16'
              }`}
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
      <div
        className=" hidden cursor-pointer hover: md:block md:fixed md:bottom-12 md:right-12 transition-transform transform hover:scale-110 hover:rotate-12"
        onClick={homeUtils.scrollToTop}
      >
        <img src="/paw.svg" alt="scrollTop" />
      </div>
    </div>
  );
};

export default Home;
