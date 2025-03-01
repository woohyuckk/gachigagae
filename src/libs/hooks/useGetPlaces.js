import { useQuery } from '@tanstack/react-query';
import fetchPlacesData from '../api/placesData';

/**
 * * 장소 목록을 가져오는 커스텀 쿼리 훅
 * @param {number} userId - 현재 로그인한 유저의 uuid
 * @returns {Object} useQuery의 결과 객체
 */
const useGetPlaces = (userId) => {
  return useQuery({
    queryKey: ['places', userId],
    queryFn: () => fetchPlacesData(userId),
    onError: (error) => {
      console.error('fetchPlacesData 에러 발생 :', error);
    },
  });
};

export default useGetPlaces;
