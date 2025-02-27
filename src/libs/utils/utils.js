// 주소 분할
const splitAddress = (address) => {
  const splitedAddress = address.split(' ');
  return splitedAddress[1] + ' ' + splitedAddress[2];
};
// 카테고리 분류
const filterCategory = (places, category) => {
  return places.filter((place) => {
    const result = place.category2 === category;
    return result;
  });
};
// 맨 위로
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
// detail 페이지로 이동
const handleGoToDetail = (id, navigate) => {
  navigate(`/detail?place_id=${id}`);
};

const utils = {
  splitAddress,
  filterCategory,
  scrollToTop,
  handleGoToDetail,
};

export default utils;
