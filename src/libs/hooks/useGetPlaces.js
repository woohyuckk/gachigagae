import { useQuery } from '@tanstack/react-query';
import fetchPlacesData from '../api/fetchData';

/**
 * * 장소 목록을 가져오는 커스텀 쿼리 훅
 * @returns {Object} 데이터 배열과 로딩 여부를 담은 객체
 */
const useGetPlaces = () => {
  const { data: placeList = [], isLoading: isLoadingPlaces } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlacesData,
    onError: (error) => {
      console.error('fetchPlacesData 에러 발생 :', error);
      alert('데이터 목록을 가져오는 도중 에러가 발생했습니다.');
    },
  });
  return { placeList, isLoadingPlaces };
};

export default useGetPlaces;
