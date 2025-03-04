import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthstore';
import { ROUTES } from '../../constants/routes';
import { useAuthMutate } from '../../libs/hooks/useAuth.api';
import { toast } from 'react-toastify';

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logoutUser } = useAuthMutate();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (isLogin) {
      logoutUser();
      toast('로그아웃 되었습니다.');
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.SIGNIN);
    }
  };

  return (
    <header className="fixed h-16 w-full z-50 bg-white border-b-1 border-gray-300">
      <nav className="flex px-5 md:mr-5 sm:mr-2 h-full items-center ">
        <div className="flex-grow ">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="logo" className="h-16 w-auto max-w-[150px] mt-2" />
          </Link>
        </div>
        <div className="flex gap-5">
          {isLogin && (
            <Link to={ROUTES.MYPAGE} className="w-auto">
              마이페이지
            </Link>
          )}
          <button onClick={handleAuthAction} className="w-auto">
            {isLogin ? '로그아웃' : '로그인'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
