import { useQuery } from '@tanstack/react-query';
import { supabase } from '../libs/api/supabaseClient';
import PlaceCard from '../components/detail/PlaceCard';

const QUERY_KEY = ['places'];

const Detail = () => {


  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data: places } = await supabase.from('places').select('*');
      return places;
    },
  });




  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PlaceCard>
      
    </PlaceCard>
  );
};

export default Detail;
