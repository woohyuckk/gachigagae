import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../api/supabaseClient";
import useAuthStore from "../../stores/useAuthstore";
import { useParams } from "react-router-dom";



export const useComment = (commentInfo) => {
  const queryClient = useQueryClient();
  let { user_id: commentUserId } = commentInfo;
  const { id: authId } = useAuthStore((state) => state.userInfo);

  const isCommenter = commentUserId === authId ? true : false;
 
  const { id } = useParams();
  const idNumber = Number(id);

  // get comments included in the post
  const getCommentsQuery= useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      const { data } = await supabase.from('comments').select('*, users(profile_img_url, nickname)').eq('place_id', idNumber);
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
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 코멘트 추가 및 수정
  const { mutate: upsertCommentMutate } = useMutation({
    mutationFn: async ({ id, comment,place_id }) => {
      const { error } = await supabase.from('comments').upsert({ id, comment,place_id }).order('id', { ascending: true });;
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {getCommentsQuery, deleteCommentMutate, upsertCommentMutate, isCommenter }
}