import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../api/supabaseClient";
import useAuthStore from "../../stores/useAuthstore";
import { COMMENT_QUERY_KEY } from "../../constants/queryKeyConstants";


const COMMENTS_PER_SCROLL = 5;

export const useComment = (commentInfo = {}) => {
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


  const { mutate: addCommentMutate } = useMutation({
    mutationFn: async ({ comment, place_id }) => {
      const { data, error } = await supabase
        .from('comments')
        .insert({ comment, place_id })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data; // 서버에서 반환된 삽입된 데이터
    },

    onMutate: async ({ comment, place_id }) => {
      await queryClient.cancelQueries({ queryKey: COMMENT_QUERY_KEY.COMMENT_PLACE_ID(place_id) });

      const previousComments = queryClient.getQueryData(COMMENT_QUERY_KEY.COMMENT_PLACE_ID(place_id)).pages // 💡 기본값 처리
      console.log(previousComments)
      const optimisticComment = {
        id: crypto.randomUUID(), // 💡 임시 ID 생성
        comment,
        place_id,
        created_at: Date.now()
      };

      queryClient.setQueryData(COMMENT_QUERY_KEY.COMMENT_PLACE_ID(place_id), (old) => {
        console.log('old====>', old)
        return {
          ...old,
          pages: [...old.pages, optimisticComment]
        }
      });

      return { previousComments, optimisticCommentId: optimisticComment.id }; // 💡 임시 ID 반환
    },

    onError: (error, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(COMMENT_QUERY_KEY.COMMENT_PLACE_ID(newComment.place_id), context.previousComments);
      }
    },

    onSuccess: (data, newComment, context) => {
      const { place_id } = newComment;
      const optimisticCommentId = context?.optimisticCommentId; // 💡 onMutate에서 반환한 임시 ID

      queryClient.setQueryData(COMMENT_QUERY_KEY.COMMENT_PLACE_ID(place_id), (old) => {
        console.log("old====>",old)
        old.pages?.map((comment) => {
          console.log("comment===>",comment)
          // console.log(!Array.isArray(comment))
          // if (!Array.isArray(comment)) {
          return comment.id === optimisticCommentId ? [ ...comment, { id: data.id, created_at: data.created_at }] : comment
          // }
        }
        )
      }
      );
    },

    onSettled: (_, __, newComment) => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.COMMENT_PLACE_ID(newComment.place_id) });
    }
  });




  // 코멘트 추가 및 수정
  const { mutate: upsertCommentMutate } = useMutation({
    mutationFn: async ({ id, comment, place_id }) => {
      const { error } = await supabase.from('comments').upsert({ id, comment, place_id })
      if (error) throw error;
      return place_id
    },
    onSuccess: (place_id) => {
      queryClient.invalidateQueries(COMMENT_QUERY_KEY.COMMENT_PLACE_ID(place_id));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { addCommentMutate, deleteCommentMutate, upsertCommentMutate, isCommenter }
}


export const useInfiniteCommentsQuery = (place_id) => {

  return useInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENT_PLACE_ID(place_id),
    queryFn: async ({ pageParam }) => {
      console.log(pageParam)
      const query = supabase.from('comments')
        .select('*, users(profile_img_url, nickname)')
        .eq('place_id', place_id)
        .order('id', { ascending: false })
        .limit(COMMENTS_PER_SCROLL);
      const { data, error } = await (pageParam ? query.lt('id', pageParam) : query);
      if (error) throw new Error(error.message)

      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return lastPage?.length === COMMENTS_PER_SCROLL ? lastPage[lastPage.length - 1].id : undefined
    }
  })
}
