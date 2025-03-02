import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addLikes, deleteLikes, fetchLikes } from '../api/likesData';

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
 * * 좋아요를 추가하거나 삭제하는 커스텀 훅
 * @param {boolean} isLiked - 현재 장소의 좋아요 여부
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @return {Function} return.toggleLike - 좋아요 토글 mutation 함수
 */
export const useToggleLikes = (isLiked, userId, category) => {
  const queryClient = useQueryClient();
  const queryKey = ['places', userId, category];

  // * 옵티미스틱 업데이트를 위한 onMutate 함수
  const handleMutate = async ({ placeId }) => {
    // 진행중인 쿼리 취소 및 현재 상태 저장
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData(queryKey);
    // 클라이언트(캐시) 상태 업데이트
    queryClient.setQueryData(queryKey, (oldData) => {
      return oldData.map((place) => {
        if (place.id === placeId) {
          return {
            ...place,
            isLiked: !place.isLiked,
          };
        }
        return place;
      });
    });
    return { previousData };
  };

  // mutation 정의
  const toggleLikeMutation = useMutation({
    mutationFn: isLiked ? deleteLikes : addLikes,
    onMutate: handleMutate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context.previousData);
      console.error('좋아요 추가 또는 삭제 에러 발생 :', error);
    },
  });

  return {
    toggleLike: toggleLikeMutation.mutate,
  };
};
