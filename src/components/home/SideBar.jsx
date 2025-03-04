import { Link } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthstore';

const SideBar = ({ onClick }) => {
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <aside className="fixed z-50 md:left-[3%] md:top-1/4 px-8 top-[150px] bg-white shadow-md border-2 rounded-2xl md:p-3 md:py-5">
      <div className="flex flex-col items-center">
        <ul className="flex flex-row md:flex-col gap-5 md:gap-3 text-center items-center text-md">
          <li className="text-gray-700 hover:text-black cursor-pointer" onClick={onClick}>
            전체보기
          </li>
          <div className="h-8 my-4 md:my-2 border-l border-gray-300 my-2 md:mx-5 md:h-0 md:w-16 md:border-l-0 md:border-t"></div>
          <li className="text-gray-700 hover:text-black cursor-pointer" onClick={onClick}>
            식당
          </li>
          <li className="text-gray-700 hover:text-black cursor-pointer" onClick={onClick}>
            카페
          </li>
        </ul>
        {userInfo.id && (
          <Link
            to="/mypage"
            className={`hidden md:block border-2 block w-[70px] h-[70px] rounded-[35px] bg-[url("${userInfo.profile_img_url}")] bg-cover bg-center mt-10`}
          ></Link>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
