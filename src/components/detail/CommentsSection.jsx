import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../libs/api/supabaseClient';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

const CommentsSection = () => {
  const queryClient = useQueryClient();
  const [comment, setcomment] = useState('');
  const { id } = useParams();
  const handleOnChagneComment = (e) => {
    setcomment(e.target.value);
  };
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
      queryClient.invalidateQueries(['comments']);
    },
  });

  const handleOnSubmitComment = (e) => {
    e.preventDefault();
    insertCommentMutate(
      { comment, place_id: idNumber },
      {
        onSuccess: () => {
          alert('성공적으로 등록되었습니다.');
          setcomment('');
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
          value={comment}
          onChange={handleOnChagneComment}
          placeholder="댓글을 입력하세요"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-all"
        >
          작성하기
        </button>
      </form>

      {/* 댓글 목록 */}
      <div className="mt-6 max-h-[500px] overflow-y-auto scrollbar-hide ">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment.comment}/>
        ))}
        
      </div>
    </div>
  );
};

export default CommentsSection;
