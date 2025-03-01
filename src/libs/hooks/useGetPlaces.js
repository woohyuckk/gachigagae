import { useQuery } from '@tanstack/react-query';
import fetchPlacesData from '../api/fetchData';

/**
 * * 장소 목록을 가져오는 커스텀 쿼리 훅
 * @returns {Object} useQuery의 결과 객체
 */
const useGetPlaces = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: fetchPlacesData,
    onError: (error) => {
      console.error('fetchPlacesData 에러 발생 :', error);
    },
  });
};

export default useGetPlaces;
