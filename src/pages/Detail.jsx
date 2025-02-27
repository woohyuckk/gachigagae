import { useQuery } from '@tanstack/react-query';
import { supabase } from '../libs/api/supabaseClient';
import PlaceCard from '../components/detail/PlaceCard';

const QUERY_KEY = ['places'];

const Detail = () => {
  const {
    data: placeInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data: placeInfo } = await supabase.from('places').select('*').eq('id', 307);
      return placeInfo[0];
    },
  });
  console.log(placeInfo);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return <PlaceCard placeInfo={placeInfo}></PlaceCard>;
};

export default Detail;
