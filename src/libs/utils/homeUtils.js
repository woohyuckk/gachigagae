import HOME_CONSTANT from '../../constants/HomeConstant';

// 주소 분할
const splitAddress = (address) => {
  const splitedAddress = address.split(' ');
  return splitedAddress[1] + ' ' + splitedAddress[2];
};

// 맨 위로
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// detail 페이지로 이동
const handleGoToDetail = (id, navigate) => {
  navigate(`/detail/${id}`);
};

// category queryString
const handleCategoryMove = (category, navigate) => {
  if (category === HOME_CONSTANT.CATEGORY_HOME) {
    navigate('/');
    return;
  }
  navigate(`/?category=${category}`);
};

// 카테고리 이름 한글로 변환
const translateCategoryName = (categoryName) => {
  switch (categoryName) {
    case HOME_CONSTANT.CATEGORY_CAFE: {
      return '카페';
    }
    case HOME_CONSTANT.CATEGORY_RESTAURANT: {
      return '식당';
    }
    default:
      return categoryName;
  }
};

const homeUtils = {
  splitAddress,
  scrollToTop,
  handleGoToDetail,
  handleCategoryMove,
  translateCategoryName,
};

export default homeUtils;
