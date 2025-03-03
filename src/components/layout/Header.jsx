import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthstore';
import { ROUTES } from '../../constants/routes';
import { useAuthMutate } from '../../libs/hooks/useAuth.api';

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logoutUser } = useAuthMutate();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (isLogin) {
      logoutUser();
      alert('로그아웃 되었습니다.');
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.SIGNIN);
    }
  };

  return (
    <header className="fixed h-28 w-full z-50">
      <nav className="flex px-15 h-full items-center">
        <h1 className="flex-grow">
          <Link to="/">로고</Link>
        </h1>
        <div className="flex gap-5">
          {isLogin && <Link to={ROUTES.MYPAGE}>마이페이지</Link>}
          <button onClick={handleAuthAction}>{isLogin ? '로그아웃' : '로그인'}</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
