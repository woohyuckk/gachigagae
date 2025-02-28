import useGetLikes from './useGetLikes';
import useGetPlaces from './useGetPlaces';

/**
 * * 유저의 좋아요 목록, 장소 목록을 가져와서 장소 객체에 좋아요 여부를 추가하는 커스텀 훅
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns
 *    { address, category1, category2, charge, coordinates, created_at, description, id, image, isLiked, tel, title, url }
 */
const usePlacesWithLiked = (userId) => {
  const { placeList, isLoadingPlaces } = useGetPlaces();
  const { likeList, isLoadingLikes } = useGetLikes(userId);

  const isLoading = isLoadingLikes || isLoadingPlaces;

  // 불러온 장소 목록에 좋아요 여부 속성 추가
  const placesWithLikeStuats = placeList.map((place) => ({
    ...place,
    isLiked: likeList.some((likePlace) => likePlace.place_id === place.id),
  }));

  return { placesWithLikeStuats, isLoading };
};

export default usePlacesWithLiked;
