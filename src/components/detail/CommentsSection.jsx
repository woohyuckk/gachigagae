import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../libs/api/supabaseClient';

const CommentsSection = () => {
  const queryClient = useQueryClient();
  const [comment, setcomment] = useState('');
  const handleOnChagneComment = (e) => {
    setcomment(e.target.value);
  };

  const { mutate: insertCommentMutate } = useMutation({
    mutationFn: async ({ comment, place_id }) => {
      await supabase.from('comments').insert({ comment, place_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      const { data } = await supabase.from('comments').select('*').eq('place_id', 307);
      return data;
    },
  });
  console.log(comments);
  if (isLoading) <div>Loading...</div>;
  if (error) <div>error</div>;

  const handleOnSubmitComment = (e) => {
    e.preventDefault();

    insertCommentMutate(
      { comment, place_id: 307 },
      {
        onSuccess: () => {
          alert('성공적으로 등록되었습니다.');
          setcomment('');
        },
      }
    );
  };

  return (
    <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">💬 코멘트 작성</h2>

      {/* 댓글 입력 */}
      <form onSubmit={handleOnSubmitComment} className="mt-4">
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={handleOnChagneComment}
          className="w-full border p-2 rounded-lg mt-2 focus:ring-2 focus:ring-pink-400 outline-none"
          placeholder="댓글을 입력하세요..."
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-all"
        >
          작성하기
        </button>
      </form>

      {/* 댓글 목록 */}
      <div className="mt-6">
        {comments.map((comment) => (
          <div className="p-4 border rounded-lg bg-gray-50" key={comment.id}>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
        <div className="p-4 border rounded-lg bg-gray-50 mt-2">
          <p className="text-gray-700">🐱 고양이: 다음에 꼭 가볼게요! 😻</p>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
