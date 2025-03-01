import { FaRegPenToSquare } from 'react-icons/fa6';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ModifyMenu = ({ menuRef, handleCommentUpdate, handleCommentDelete }) => {
  return (
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
  );
};

export default ModifyMenu;
