import { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../libs/api/supabaseClient';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

const CommentsSection = () => {
  const queryClient = useQueryClient();
  const commentRef = useRef();
  const { id } = useParams();
  const idNumber = Number(id);
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      const { data } = await supabase.from('comments').select('*').eq('place_id', idNumber);
      return data;
    },
  });
  const { mutate: insertCommentMutate } = useMutation({
    mutationFn: async ({ comment, place_id }) => {
      await supabase.from('comments').insert({ comment, place_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    },
  });

  const handleOnSubmitComment = (e) => {
    e.preventDefault();
    const comment = commentRef.current.value.trim();

    if (!comment) return;

    insertCommentMutate(
      { comment, place_id: idNumber },
      {
        onSuccess: () => {
          alert('성공적으로 등록되었습니다.');
          commentRef.current.value = '';
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  return (
    <div className="w-full = md:w-1/3   bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">💬 코멘트 작성</h2>

      {/* 댓글 입력 */}
      <form onSubmit={handleOnSubmitComment} className="mt-4">
        <textarea
          className="w-full h-32 p-2 border rounded-lg resize-none overflow-y-auto focus:ring-pink-400 outline-none"
          // value={comment}
          ref={commentRef}
          placeholder="댓글을 입력하세요"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-all"
        >
          작성하기
        </button>
      </form>

      {/* 댓글 목록 overflow-y-auto scrollbar-hide*/}
      <div className="mt-6">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        }) || <div className="text-center"> comment가 존재하지 않습니다. </div>}
      </div>
    </div>
  );
};

export default CommentsSection;
