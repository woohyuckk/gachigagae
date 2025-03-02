import HomeCard from './HomeCard';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import homeUtils from '../../libs/utils/homeUtils';

const HomeCardContainer = ({ places }) => {
  const navigate = useNavigate();

  // * 카테고리 정렬 핸들러 함수
  const handleCategory = (e) => {
    const categoryName = e.target.innerText;
    homeUtils.handleCategoryMove(categoryName, navigate);
    homeUtils.scrollToTop();
  };

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
            <HomeCard place={place} onClick={handleCategory} />
          </article>
        );
      })}
    </div>
  );
};

export default HomeCardContainer;
