export const HOME_QUERY_KEY = {
  // 홈 페이지의 카테고리별 쿼리 데이터 저장용
  INFINITE_PLACE: (userId, selectedCategory, searchValue) => [
    'infinitePlaces',
    userId,
    selectedCategory,
    searchValue,
  ],
  // 홈 페이지의 전체 카테고리 쿼리 데이터 invalidate
  INFINITE_PLACES: (userId) => ['infinitePlaces', userId],
};

export const LIKES_QUERY_KEY = {
  // 좋아요 페이지 쿼리 데이터 저장용
  LIKE_PLACES: ['likePlaces'],
};

export const DETAIL_QUERY_KEY = {
  // 디테일 페이지 정보 쿼리 데이터 저장용
  PLACE_PLACE_ID: (id) => ['place', id],
  // 디테일 페이지 전체 데이터 invalidate
  PLACES: ['place'],
};

export const COMMENT_QUERY_KEY = {
  COMMENT: ['comment'],
  COMMENT_PLACE_ID: (place_id) => ['comment', place_id],
};
