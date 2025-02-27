import { useState } from 'react';
import HomeCard from './HomeCard';
import SideBar from './SideBar';
import HOME_CONSTANT from '../../constants/HomeConstant';
import { useNavigate } from 'react-router-dom';
import utils from '../../libs/utils/utils';

const HomeCardContainer = ({ getPlaces }) => {
  const [places, setPlaces] = useState(getPlaces);
  const navigate = useNavigate();

  // 카테고리 정렬
  const handleCategory = (e) => {
    const categoryName = e.target.innerText;
    const translateCategoryName =
      categoryName === HOME_CONSTANT.CATEGORY_CAFE
        ? '카페'
        : categoryName === HOME_CONSTANT.CATEGORY_RESTAURANT
        ? '식당'
        : categoryName;
    if (translateCategoryName === HOME_CONSTANT.CATEGORY_HOME) {
      setPlaces(getPlaces);
      utils.scrollToTop();
    } else {
      setPlaces(utils.filterCategory(getPlaces, translateCategoryName));
      utils.scrollToTop();
    }
  };

  return (
    <div className="lg:w-full lg:max-w-3xl m-auto flex flex-wrap gap-7 justify-evenly p-4 sm:w-1/2 md:gap-20">
      <SideBar onClick={handleCategory} />

      {places.map((item, idx) => {
        return (
          <article
            key={item.id}
            onClick={() => {
              utils.handleGoToDetail(item.id, navigate);
            }}
            className={
              idx % 2 === 1
                ? 'lg:w-1/3 sm:w-full w-3/4 h-80 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col '
                : 'lg:w-1/3 sm:w-full w-3/4 h-80 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col lg:top-16  '
            }
          >
            <HomeCard {...item} onClick={handleCategory} />
          </article>
        );
      })}
    </div>
  );
};

export default HomeCardContainer;
