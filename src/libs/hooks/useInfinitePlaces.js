import { useInfiniteQuery } from '@tanstack/react-query';
import fetchData from '../api/fetchData';

const useInfinitePlaces = (selectedCategory) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['infinitePlaces', selectedCategory],
      queryFn: ({ pageParam = null }) =>
        fetchData.fetchPlacesData({ pageParam, category2: selectedCategory }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        const result = lastPage.length
          ? {
              id: lastPage[lastPage.length - 1].id,
            }
          : null;

        return result;
      },
      initialData: { pages: [], pageParams: [] },
    });

  if (error) {
    console.log(error);
  }

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching };
};

export default useInfinitePlaces;
