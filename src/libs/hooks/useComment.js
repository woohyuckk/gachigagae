import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../api/supabaseClient";
import useAuthStore from "../../stores/useAuthstore";
import { useParams } from "react-router-dom";
import { COMMENT_QUERY_KEY } from "../../constants/queryKeyConstants";


const COMMENTS_PER_SCROLL = 5;

export const useComment = (commentInfo) => {
  const queryClient = useQueryClient();
  let { user_id: commentUserId } = commentInfo;
  const { id: authId } = useAuthStore((state) => state.userInfo);

  const isCommenter = commentUserId === authId ? true : false;

  const { id } = useParams();
  const idNumber = Number(id);

  // get comments included in the post
  const getCommentsQuery = useQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENT,
    queryFn: async () => {
      const { data } = await supabase.from('comments').select('*, users(profile_img_url, nickname)').eq('place_id', idNumber).order('created_at', { ascending: false }).limit(COMMENTS_PER_SCROLL);
      return data;
    },
  });

  // delete comment
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





  return { getCommentsQuery, deleteCommentMutate, upsertCommentMutate, isCommenter }
}


export const useInfiniteCommentsQuery = (idNumber) => {


  return useInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENT_PLACE_ID(idNumber),
    queryFn: async ({ pageParam }) => {
      const query = supabase.from('comments')
        .select('*, users(profile_img_url, nickname)')
        .eq('place_id', idNumber)
        .order('created_at', { ascending: false })
        .limit(COMMENTS_PER_SCROLL);
      const { data, error } = await (pageParam ? query.lt('created_at', pageParam) : query);
      if (error) throw new Error(error.message)
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.length === COMMENTS_PER_SCROLL ? lastPage[lastPage.length - 1].created_at : undefined
    }
  })
}
