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
 * @return {Function} return.toggleLike - 좋아요 토글 mutation 함수
 */
export const useToggleLikes = (isLiked) => {
  const queryClient = useQueryClient();

  const toggleLikeMutation = useMutation({
    mutationFn: isLiked ? deleteLikes : addLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
    onError: (error) => {
      console.error('좋아요 추가 또는 삭제 에러 발생 :', error);
    },
  });

  return {
    toggleLike: toggleLikeMutation.mutate,
  };
};
