import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { useComment, useInfiniteCommentsQuery } from '../../../libs/hooks/useComment';

const CommentsSection = () => {
  const { addCommentMutate } = useComment({});
  const commentRef = useRef();
  const observerRef = useRef(null);
  const { id } = useParams();
  const idNumber = Number(id);
  // const { data: comments, isLoading, error } = getCommentsQuery;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCommentsQuery(idNumber);
  const comments = data?.pages.flat() || [];
  const handleOnSubmitComment = (e) => {
    e.preventDefault();
    const comment = commentRef.current.value.trim();

    if (!comment) return;
    addCommentMutate(
      { comment, place_id: idNumber },
      {
        onSuccess: () => {
          alert('성공적으로 등록되었습니다.');
          commentRef.current.value = '';
        },
      }
    );
  };

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
        rootMargin: '100px',
      }
    );
    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

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
          className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-all cursor-pointer"
        >
          작성하기
        </button>
      </form>

      {/* 댓글 목록 overflow-y-auto scrollbar-hide*/}
      <div className="mt-6 overflow-y-auto scrollbar-hide max-h-[550px]">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        }) || <div className="text-center"> comment가 존재하지 않습니다. </div>}
        <div ref={observerRef} className="h-10" />
        {isFetchingNextPage && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default CommentsSection;
