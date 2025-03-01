import { useInfiniteQuery } from '@tanstack/react-query';
import fetchData from '../api/fetchData';

const useInfinitePlaces = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['infinitePlaces'],
      queryFn: fetchData.fetchLimitPlacesData,
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        // console.log('getNextPageParam 호출 : ', lastPage);
        const result = lastPage.length
          ? {
              created_at: lastPage[lastPage.length - 1].created_at,
              id: lastPage[lastPage.length - 1].id,
            }
          : undefined;

        console.log(result);

        return result;
      },
      initialData: { pages: [], pageParams: [] },
    });

  if (error) {
    console.log(error);
  }
  console.log('useInfinitePlaces : ', data);

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching };
};

export default useInfinitePlaces;
