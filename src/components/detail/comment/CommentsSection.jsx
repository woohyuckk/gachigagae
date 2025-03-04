import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { useComment, useInfiniteCommentsQuery } from '../../../libs/hooks/useComment';
import { toast } from 'react-toastify';
import useAuthStore from '../../../stores/useAuthstore';
import DefaultButton from '../../buttons/DefaultButton';
import { TOAST_MSG } from '../../../constants/toastMessages';

/**
 * @param {number} : idNumber -> place_id useParams로부터 읽은 string 변환
 * @param {string} : comment
 * @param {object:[]} : comments supabase에서 불러온 comment
 * @param {boolean} : isLogin
 * @returns
 */
const CommentsSection = () => {
  const { addCommentMutate } = useComment({});
  const commentRef = useRef();
  const observerRef = useRef(null);
  const { id } = useParams();
  const idNumber = Number(id);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCommentsQuery(idNumber);
  const comments = data?.pages.flat() || [];

  const handleOnSubmitComment = (e) => {
    e.preventDefault();

    if (!isLogin) {
      toast(TOAST_MSG.SIGNIN_FIRST);
      return;
    }
    const comment = commentRef.current.value.trim();

    if (!comment) return;
    addCommentMutate(
      { comment, place_id: idNumber },
      {
        onSuccess: () => {
          toast(TOAST_MSG.INSERT_CLEAR);
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
    <div className="w-full md:w-1/3 h-[854px]   bg-white rounded-2xl shadow-lg p-6 border-2 ">
      <h2 className="text-xl font-semibold text-gray-800">💬 코멘트 작성</h2>

      {/* 댓글 입력 */}
      <form onSubmit={handleOnSubmitComment} className="mt-4 border-b-2 pb-4 ">
        <textarea
          className="w-full h-32 p-2 border-2 rounded-2xl resize-none overflow-y-auto  outline-none"
          ref={commentRef}
          placeholder="댓글을 입력하세요"
        />
        <DefaultButton type="submit" className="w-full mt-2" bgColor="orange">
          작성하기
        </DefaultButton>
      </form>

      {/* 댓글 목록 overflow-y-auto scrollbar-hide*/}
      <div className="mt-6 overflow-y-auto scrollbar-hide max-h-[550px]">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
        {!comments && <div className="text-center"> comment가 존재하지 않습니다. </div>}
        <div ref={observerRef} className="h-10" />
        {isFetchingNextPage && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default CommentsSection;
