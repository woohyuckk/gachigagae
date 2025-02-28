import { useQuery } from '@tanstack/react-query';
import fetchData from '../api/fetchData';
// import fetchPlacesData from '../api/fetchData';

const useGetPlaces = () => {
  const {
    data: getPlaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['places'],
    queryFn: fetchData.fetchPlacesData,
  });

  return { getPlaces, isLoading, error };
};

export default useGetPlaces;
