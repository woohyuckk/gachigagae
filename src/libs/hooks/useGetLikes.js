import { useQuery } from '@tanstack/react-query';
import fetchLikes from '../api/fetchLikes';

/**
 * * 유저의 좋아요 목록을 가져오는 커스텀 쿼리 훅
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object} 데이터 배열과 로딩 여부를 담은 객체
 */
const useGetLikes = (userId) => {
  const { data: likeList = [], isLoading: isLoadingLikes } = useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchLikes(userId),
    onError: (error) => {
      console.error('fetchLikes 에러 발생 :', error);
      alert('데이터 목록을 가져오는 도중 에러가 발생했습니다.');
    },
    enabled: !!userId,
  });

  return { likeList, isLoadingLikes };
};

export default useGetLikes;
