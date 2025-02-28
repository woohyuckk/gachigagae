import { useQuery } from '@tanstack/react-query';
import { supabase } from '../libs/api/supabaseClient';
import PlaceCard from '../components/detail/PlaceCard';
import { useParams } from 'react-router-dom';

const QUERY_KEY = ['places'];

const Detail = () => {
  const { id } = useParams();
  const {
    data: placeInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data: placeInfo } = await supabase.from('places').select('*').eq('id',Number(id));
      return placeInfo[0];
    },
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return <PlaceCard placeInfo={placeInfo}></PlaceCard>;
};

export default Detail;
