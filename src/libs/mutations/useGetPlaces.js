import { useQuery } from '@tanstack/react-query';
import fetchPlacesData from '../api/fetchData';

const useGetPlaces = () => {
  const {
    data: places,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlacesData,
  });

  return { places, isLoading, error };
};

export default useGetPlaces;
