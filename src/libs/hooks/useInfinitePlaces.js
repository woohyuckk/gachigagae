import { useInfiniteQuery } from '@tanstack/react-query';
import fetchData from '../api/fetchData';
import { HOME_QUERY_KEY } from '../../constants/queryKeyConstants';

const useInfinitePlaces = (selectedCategory, userId, searchValue) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: HOME_QUERY_KEY.INFINITE_PLACE(userId, selectedCategory, searchValue),
      queryFn: ({ pageParam = null }) =>
        fetchData.fetchPlacesData({ pageParam, category2: selectedCategory, userId, searchValue }),
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
