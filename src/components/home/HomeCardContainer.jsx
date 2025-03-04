import HomeCard from './HomeCard';
import SideBar from './SideBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import homeUtils from '../../libs/utils/homeUtils';
import useInfinitePlaces from '../../libs/hooks/useInfinitePlaces';
import { useInView } from 'react-intersection-observer';
import useAuthStore from '../../stores/useAuthstore';
import { useEffect, useState } from 'react';
// import useGetPlaces from '../../libs/hooks/useGetPlaces';

const HomeCardContainer = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthStore((state) => state.userInfo);
  const [searchParams] = useSearchParams();
  // 쿼리스트링에 따라 데이터 다르게 가져오기
  const category = searchParams.get('category');
  const searchValue = searchParams.get('search');

  const {
    data: places,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePlaces(category, userId, searchValue);

  const { ref } = useInView({
    threshold: 1,
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
    <div className="lg:w-full lg:max-w-3xl m-auto flex flex-wrap gap-7 justify-evenly p-4 sm:w-1/2 md:gap-20">
      <SideBar onClick={handleCategory} />

      {places.pages.flat().map((place, idx) => {
        return (
          <article
            key={place.id}
            onClick={() => {
              homeUtils.handleGoToDetail(place.id, navigate);
            }}
            className={
              idx % 2 === 1
                ? 'lg:w-1/3 sm:w-full w-3/4 h-80 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col '
                : 'lg:w-1/3 sm:w-full w-3/4 h-80 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col lg:top-16  '
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
  );
};

export default HomeCardContainer;
