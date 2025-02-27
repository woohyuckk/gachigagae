import { useQuery } from '@tanstack/react-query';
import fetchPlacesData from '../api/fetchData';

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

export default useGetPlaces;
