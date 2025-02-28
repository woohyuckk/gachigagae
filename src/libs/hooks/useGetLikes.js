import { useQuery } from '@tanstack/react-query';
import fetchLikes from '../api/fetchLikes';

const useGetLikes = (userId) => {
  const {
    data: likeList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchLikes(userId),
  });

  return { likeList, isLoading, error };
};

export default useGetLikes;
