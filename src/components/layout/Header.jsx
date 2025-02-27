import { Link } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthstore';

const Header = () => {
  const { isLogin } = useAuthStore();

  return (
    <header className="fixed h-28 w-full">
      <nav className="flex px-15 h-full items-center">
        <h1 className="flex-grow">
          <Link to="/">로고</Link>
        </h1>
        {isLogin ? (
          <div className="flex gap-5">
            <Link to="/mypage">마이페이지</Link>
            <button>로그아웃</button>
          </div>
        ) : (
          <Link to="/signin">로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
