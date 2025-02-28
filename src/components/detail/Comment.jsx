import { useState, useRef, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";

const Comment = ({ comment }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const profileImage =
    "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740";

  // 바깥 클릭 감지하여 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col p-2 bg-purple-200 rounded-xl w-full border-b border-gray-400 my-1.5 relative overflow-visible">
      {/* 프로필 이미지 + 닉네임 + 메뉴 버튼 */}
      <div className="flex w-full items-center justify-between border-b p-1 relative flex-wrap">
        <div className="flex items-center space-x-2 min-w-0">
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-300 flex-shrink-0"
          />
          <span className="font-bold text-black truncate max-w-[150px]">
            NICKNAME
          </span>
        </div>

        {/* 메뉴 버튼 */}
        <div className="relative flex-shrink-0">
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
              <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100">
                <FaRegPenToSquare className="mr-2" /> 수정
              </button>
              <button className="flex items-center w-full px-3 py-2 hover:bg-red-100 text-red-500">
                <RiDeleteBin5Line className="mr-2" /> 삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 댓글 내용 */}
      <div className="w-full overflow-hidden p-2">
        <span className="whitespace-pre-wrap break-words">{comment}</span>
      </div>
    </div>
  );
};

export default Comment;
