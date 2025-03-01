import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addLikes, fetchLikes } from '../api/likesData';
import useGetPlaces from './useGetPlaces';

/**
 * * 유저의 좋아요 목록, 장소 목록을 가져와서 장소 객체에 좋아요 여부를 추가하는 커스텀 훅
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object} 데이터 배열과 로딩 여부를 담은 객체
 * @returns {Ojbect[]} return.placesWithLikeStuats - 좋아요 여부가 추가된 장소 데이터 배열
 *    { ...prev, isLiked }
 */
export const usePlacesWithLiked = (userId) => {
  const { data: placeList = [], isLoading: isLoadingPlaces } = useGetPlaces();
  const { data: likeList = [], isLoading: isLoadingLikes } = useGetLikes(userId);

  const isLoading = isLoadingLikes || isLoadingPlaces;

  // 불러온 장소 목록에 좋아요 여부 속성 추가
  const placesWithLikeStuats = placeList.map((place) => ({
    ...place,
    isLiked: likeList.some((likePlace) => likePlace.place_id === place.id),
  }));

  return { placesWithLikeStuats, isLoading };
};

/**
 * * 유저의 좋아요 목록을 가져오는 커스텀 쿼리 훅
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object} useQuery의 결과 객체
 */
export const useGetLikes = (userId) => {
  return useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchLikes(userId),
    onError: (error) => {
      console.error('fetchLikes 에러 발생 :', error);
    },
    enabled: !!userId,
  });
};

/**
 * * 좋아요 데이터를 추가하는 커스텀 쿼리 훅
 * @returns {Object} useQuery의 결과 객체
 */
export const useAddLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: (error) => {
      console.error('addLikes 에러 발생 :', error);
    },
  });
};
