import { useQuery } from '@tanstack/react-query';
import fetchLikesData from '../api/fetchLikesData';

const useLikedPlaces = () => {
  const {
    data: LikedPlaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['LikedPlaces'],
    queryFn: fetchLikesData,
  });

  return { LikedPlaces, isLoading, error };
};

export default useLikedPlaces;
