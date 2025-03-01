import { useState, useRef, useEffect } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useComment } from '../../libs/hooks/useComment';

const Comment = ({ comment: commentInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  let { id, comment } = commentInfo;
  const menuRef = useRef();
  const commentRef = useRef();

  const { deleteCommentMutate, upsertCommentMutate, isCommenter } = useComment(commentInfo);
  const profileImage =
    'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740';

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

  //  수정하기 누른후 수정영역에 focus
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

  const handleSubmitUdateComment = (e) => {
    e.preventDefault();
    comment = commentRef.current.value;
    upsertCommentMutate(
      { id, comment },
      {
        onSuccess: () => {
          alert('수정되었습니다.');
          setIsUpdateComment((prev) => !prev);
        },
      }
    );
  };

  return (
    <div className="flex flex-col  bg-purple-200 rounded-xl w-full border-b border-gray-400 p-2 my-3 relative ">
      <div className="flex w-full items-center justify-between border-b p-1 relative flex-wrap">
        <div className="flex items-center space-x-2 min-w-0">
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-300 "
          />
          <span className="font-bold text-black truncate max-w-[150px]">NICKNAME</span>
        </div>

        {/* 메뉴 버튼 */}
        {isCommenter && (
          <div className="relative ">
            <button
              className="p-2 rounded-full hover:bg-gray-300 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <CiMenuKebab size={20} />
            </button>

            {/* 수정/삭제 버튼 (햄버거 버튼의 "오른쪽"에 배치) */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute left-full top-0 ml-2 w-28 bg-white shadow-lg rounded-md z-50 border border-gray-300"
              >
                <button
                  className="flex items-center justify-center w-full px-3 py-2 hover:bg-gray-100"
                  onClick={handleCommentUpdate}
                >
                  <FaRegPenToSquare className="mr-2" /> 수정
                </button>
                <button
                  className="flex items-center  justify-center w-full px-3 py-2 hover:bg-red-100 text-red-500"
                  onClick={handleCommentDelete}
                >
                  <RiDeleteBin5Line className="mr-2" /> 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 댓글 내용 */}
      {isUpdateComment ? (
        <form onSubmit={handleSubmitUdateComment} className="mt-4 w-full overflow-hidden p-2">
          <textarea
            className="w-full  p-2 border rounded-lg resize-none overflow-y-auto focus:ring-pink-400 outline-none"
            ref={commentRef}
            name="comment"
            placeholder="댓글을 입력하세요"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-full px-3 py-2 rounded-lg bg-pink-500 text-white   mt-2 hover:bg-pink-600 transition-all"
          >
            <FaRegPenToSquare className="mr-2" /> 수정
          </button>
        </form>
      ) : (
        <span className="whitespace-pre-wrap break-words">{comment}</span>
      )}
    </div>
  );
};

export default Comment;
