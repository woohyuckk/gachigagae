import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addLikes, deleteLikes, fetchLikePlaces } from '../api/likesData';
import {
  LIKES_QUERY_KEY,
  HOME_QUERY_KEY,
  DETAIL_QUERY_KEY,
} from '../../constants/queryKeyConstants';

/**
 * * 유저가 좋아요한 장소 목록을 가져오는 커스텀 쿼리 훅
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object} useQuery의 결과 객체
 */
export const useGetLikePlaces = (userId) => {
  return useQuery({
    queryKey: LIKES_QUERY_KEY.LIKE_PLACES,
    queryFn: () => fetchLikePlaces(userId),
    onError: (error) => {
      console.error('fetchLikePlaces 에러 발생 :', error);
    },
  });
};

/**
 * * 좋아요를 추가하거나 삭제하는 커스텀 훅
 * @param {boolean} isLiked - 현재 장소의 좋아요 여부
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @param {string} queryType - 현재 페이지 "home", "detail", "likes"
 * @param {Object} args
 *   queryType="home"일 경우 args = { selectedCategory, searchValue }
 *   queryType="detail"일 경우 args = { placeId }
 *   queryType="likes"일 경우 args = null
 *
 * @return {Function} return.toggleLike - 좋아요 토글 mutation 함수
 */
export const useToggleLikes = (isLiked, userId, queryType, args) => {
  const queryClient = useQueryClient();

  // * 홈 뮤테이션
  const homeMutation = async ({ placeId }) => {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData(queryKey);
    queryClient.setQueryData(queryKey, (oldData) => {
      return {
        ...oldData,
        pages: oldData.pages?.map((pages) => {
          return pages.map((place) => {
            if (place.id === placeId) {
              return {
                ...place,
                is_liked: !isLiked,
              };
            } else {
              return place;
            }
          });
        }),
      };
    });
    return { previousData };
  };

  // * 디테일 뮤테이션
  const detailMutation = async () => {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData(queryKey);
    queryClient.setQueryData(queryKey, (oldData) => {
      return {
        ...oldData,
        is_liked: !isLiked,
      };
    });
    return { previousData };
  };

  // * 좋아요 리스트 뮤테이션
  const likesMutation = async ({ placeId }) => {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData(queryKey);
    queryClient.setQueryData(queryKey, (oldData) => {
      return oldData.filter((place) => {
        return place.id !== placeId;
      });
    });
    return { previousData };
  };

  let queryKey, mutateFunc;
  switch (queryType) {
    case 'home':
      queryKey = HOME_QUERY_KEY.INFINITE_PLACE(userId, args.category, args.searchValue);
      mutateFunc = homeMutation;
      break;
    case 'detail':
      queryKey = DETAIL_QUERY_KEY.PLACE_PLACE_ID(args.placeId);
      mutateFunc = detailMutation;
      break;
    case 'likes':
      queryKey = LIKES_QUERY_KEY.LIKE_PLACES;
      mutateFunc = likesMutation;
      break;
    default:
      queryKey = [];
      mutateFunc = homeMutation;
  }

  // mutation 정의
  const toggleLikeMutation = useMutation({
    mutationFn: isLiked ? deleteLikes : addLikes,
    // * 옵티미스틱 업데이트를 위한 onMutate 함수
    onMutate: mutateFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_QUERY_KEY.INFINITE_PLACES });
      queryClient.invalidateQueries({ queryKey: LIKES_QUERY_KEY.LIKE_PLACES });
      queryClient.invalidateQueries({ queryKey: DETAIL_QUERY_KEY.PLACES });
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context.previousData);
      console.error('좋아요 추가 또는 삭제 에러 발생 :', error);
    },
  });

  return {
    toggleLike: toggleLikeMutation.mutate,
  };
};
