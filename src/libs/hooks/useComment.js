import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../api/supabaseClient";
import useAuthStore from "../../stores/useAuthstore";
import { COMMENT_QUERY_KEY } from "../../constants/queryKeyConstants";


const COMMENTS_PER_SCROLL = 5;

export const useComment = (commentInfo) => {
  const queryClient = useQueryClient();

  let { user_id: commentUserId } = commentInfo;
  const { id: authId } = useAuthStore((state) => state.userInfo);

  const isCommenter = (commentUserId === authId);

  // 코멘트 삭제 
  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      alert('삭제되었습니다');
      queryClient.invalidateQueries(COMMENT_QUERY_KEY.COMMENT);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 코멘트 추가 및 수정
  const { mutate: upsertCommentMutate } = useMutation({
    mutationFn: async ({ id, comment, place_id }) => {
      const { error } = await supabase.from('comments').upsert({ id, comment, place_id })
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(COMMENT_QUERY_KEY.COMMENT);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { deleteCommentMutate, upsertCommentMutate, isCommenter }
}


export const useInfiniteCommentsQuery = (idNumber) => {

  return useInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENT_PLACE_ID(idNumber),
    queryFn: async ({ pageParam }) => {
      const query = supabase.from('comments')
        .select('*, users(profile_img_url, nickname)')
        .eq('place_id', idNumber)
        .order('id', { ascending: false })
        .limit(COMMENTS_PER_SCROLL);
      const { data, error } = await (pageParam ? query.lt('id', pageParam) : query);
      if (error) throw new Error(error.message)
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.length === COMMENTS_PER_SCROLL ? lastPage[lastPage.length - 1].id : undefined
    }
  })
}
