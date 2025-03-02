import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../api/supabaseClient";
import useAuthStore from "../../stores/useAuthstore";
import { useParams } from "react-router-dom";
import { COMMENT_QUERY_KEY } from "../../constants/queryKeyConstants";



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
      const { data } = await supabase.from('comments').select('*, users(profile_img_url, nickname)').eq('place_id', idNumber).order('created_at', { ascending: false });
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
      const { error } = await supabase.from('comments').upsert({ id, comment, place_id }).order('created_at', { ascending: false });
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