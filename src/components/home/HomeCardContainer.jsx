import { useState } from 'react';
import HomeCard from './HomeCard';
import SideBar from './SideBar';
import HOME_CONSTANT from '../../constants/homeConstant';
import { useNavigate } from 'react-router-dom';
import homeUtils from '../../libs/utils/homeUtils';
import { useInView } from 'react-intersection-observer';
import useInfinitePlaces from '../../libs/hooks/useInfinitePlaces';

const HomeCardContainer = ({ getPlaces }) => {
  const [places, setPlaces] = useState(getPlaces);
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfinitePlaces();

  const [ref, inView] = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (!inView || !hasNextPage || !isFetchingNextPage) return;
      fetchNextPage();
    },
  });
  console.log(data);

  // 카테고리 정렬
  const handleCategory = (e) => {
    const categoryName = e.target.innerText;

    if (homeUtils.translateCategoryName(categoryName) === HOME_CONSTANT.CATEGORY_HOME) {
      setPlaces(getPlaces);
      homeUtils.handleCategoryMove(categoryName, navigate);
      homeUtils.scrollToTop();
    } else {
      homeUtils.handleCategoryMove(categoryName, navigate);
      setPlaces(homeUtils.filterCategory(getPlaces, homeUtils.translateCategoryName(categoryName)));
      homeUtils.scrollToTop();
    }
  };

  if(isFetching) return(<div>Fetching...</div>)

  return (
    <div className="lg:w-full lg:max-w-3xl m-auto flex flex-wrap gap-7 justify-evenly p-4 sm:w-1/2 md:gap-20">
      <SideBar onClick={handleCategory} />

      {places.map((place, idx) => {
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
              <HomeCard
                place={place}
                onClick={handleCategory}
                ref={ref}
                inView={inView}
                text="7번째"
              />
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
