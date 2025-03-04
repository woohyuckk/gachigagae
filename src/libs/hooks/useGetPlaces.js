import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { PlACES_QUERY_KEY } from '../../constants/queryKeyConstants';
import fetchPlacesData from '../api/placesData';

/**
 * * 장소 목록을 가져오는 커스텀 쿼리 훅
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @param {string} category - 현재 페이지의 category ('Restaurant', 'Cafe' 또는 null)
 * @returns {Object} useQuery의 결과 객체
 */
const useGetPlaces = (userId, category) => {
  return useQuery({
    queryKey: ['places', userId, category],
    queryFn: () => fetchPlacesData(userId, category),
    onError: (error) => {
      console.error('fetchPlacesData 에러 발생 :', error);
    },
  });
};

export const useGetPlaceInfo = () => {
  const { id } = useParams();
  const idNumber = Number(id);

  const placeInfo = useQuery({
    queryKey: PlACES_QUERY_KEY.PLACE_PLACE_ID(idNumber),
    queryFn: async () => {
      const { data: place } = await supabase.from('places').select('*').eq('id', idNumber).single();
      return place;
    },
  });
  return placeInfo;
};

export default useGetPlaces;
