import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../api/supabaseClient";
import useAuthStore from "../../stores/useAuthstore";



export const useComment = (commentInfo) => {
  const queryClient = useQueryClient();
  let { user_id: commentUserId } = commentInfo;
  const { id: authId } = useAuthStore((state) => state.userInfo);

  const isCommenter = commentUserId === authId ? true : false;
  // 코멘트 삭제
  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      alert('삭제되었습니다');
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 코멘트 수정
  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: async ({ id, comment }) => {
      const { error } = await supabase.from('comments').update({ comment }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      alert('수정되었습니다.');
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { deleteCommentMutate, updateCommentMutate, isCommenter }
}