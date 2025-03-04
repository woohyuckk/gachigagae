import { useEffect, useRef, useState } from 'react';
import { useComment } from '../../../libs/hooks/useComment';
import { CiMenuKebab } from 'react-icons/ci';
import CommentUserProfile from './CommentUserProfile';
import ModifyMenu from './ModifyMenu';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import DefaultButton from '../../buttons/DefaultButton';

const Comment = ({ comment: commentInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  let {
    id,
    comment,
    users: { profile_img_url: userProfileImage, nickname },
  } = commentInfo;
  const menuRef = useRef();
  const commentRef = useRef();

  const { deleteCommentMutate, upsertCommentMutate, isCommenter } = useComment(commentInfo);

  // 바깥 클릭 감지하여 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //  수정하기 누른후 수정영역에 focus 주기
  useEffect(() => {
    if (isUpdateComment) {
      commentRef.current.focus();
      commentRef.current.value = comment;
    }
  }, [isUpdateComment]);

  const handleCommentUpdate = () => {
    setIsUpdateComment((prev) => !prev);
    setIsMenuOpen((prev) => !prev);
  };

  const handleCommentDelete = () => {
    deleteCommentMutate(id);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmitUdateComment = (e) => {
    e.preventDefault();
    comment = commentRef.current.value.trim();
    if (!comment) {
      return toast('내용을 입력해주세요.');
    }

    upsertCommentMutate(
      { id, comment },
      {
        onSuccess: () => {
          toast('수정되었습니다.');
          setIsUpdateComment((prev) => !prev);
        },
      }
    );
  };

  return (
    <div className="flex flex-col  bg-gray-200 rounded-xl w-full border-2 border-dashed border-gray-400 p-2 my-3 relative ">
      <div className="flex w-full items-center justify-between border-b-2 border-gray-400 pb-2 relative flex-wrap">
        <CommentUserProfile userProfileImage={userProfileImage} nickname={nickname} />

        {/* 메뉴 버튼 */}
        {isCommenter && (
          <div className="relative ">
            <button
              className="p-2 rounded-full hover:bg-gray-300 transition cursor-pointer"
              onClick={handleMenuToggle}
            >
              <CiMenuKebab size={20} />
            </button>

            {/* 수정/삭제 버튼 */}
            {isMenuOpen && (
              <ModifyMenu
                menuRef={menuRef}
                handleCommentDelete={handleCommentDelete}
                handleCommentUpdate={handleCommentUpdate}
              />
            )}
          </div>
        )}
      </div>

      {/* 수정 댓글 내용 */}
      {isUpdateComment ? (
        <form onSubmit={handleSubmitUdateComment} className="mt-4 w-full overflow-hidden p-2">
          <textarea
            className="w-full  p-2 border rounded-lg resize-none overflow-y-auto focus:ring-pink-400 outline-none"
            ref={commentRef}
            name="comment"
            placeholder="댓글을 입력하세요"
          />
          <DefaultButton
            type="submit"
            className="flex items-center justify-center w-full "
            bgColor="orange"
          >
            <FaRegPenToSquare className="mr-2" /> 수정
          </DefaultButton>
        </form>
      ) : (
        <p className="whitespace-pre-wrap break-words p-1 my-1">{comment}</p>
      )}
    </div>
  );
};

export default Comment;
