import { useQuery } from '@tanstack/react-query';
import fetchPlacesData from '../api/fetchData';
import { useParams } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { PlACES_QUERY_KEY } from '../../constants/queryKeyConstants';

const useGetPlaces = () => {

  const {
    data: getPlaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlacesData,
  });

  return { getPlaces, isLoading, error };
};

export const useGetPlaceInfo = () => {
  const { id } = useParams();
  const idNumber = Number(id);

  const placeInfo = useQuery({
    queryKey: PlACES_QUERY_KEY.PLACE_PLACE_ID(idNumber),
    queryFn: async () => {
      const { data: place } = await supabase.from('places').select('*').eq('id', idNumber).single();
      return place;
    }
  })
  return placeInfo

}

export default useGetPlaces;
