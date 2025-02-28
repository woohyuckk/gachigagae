import { useQuery } from '@tanstack/react-query';
import { supabase } from '../libs/api/supabaseClient';
import PlaceCard from '../components/detail/PlaceCard';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const QUERY_KEY = ['place', idNumber];

  const {
    data: placeInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data: place } = await supabase.from('places').select('*').eq('id', idNumber).single();
      return place;
    },
    staleTime: 1000 * 60 * 1,
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return <PlaceCard placeInfo={placeInfo}></PlaceCard>;
};

export default Detail;
