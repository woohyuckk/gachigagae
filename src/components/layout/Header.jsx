import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthstore';
import { ROUTES } from '../../constants/routes';
import { useAuthMutate } from '../../libs/hooks/useAuth.api';
import { toast } from 'react-toastify';
import useInfinitePlaces from '../../libs/hooks/useInfinitePlaces';
import { useEffect, useState } from 'react';

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { logoutUser } = useAuthMutate();
  const navigate = useNavigate();
  const { id: userId } = useAuthStore((state) => state.userInfo);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  // 쿼리스트링에 따라 데이터 다르게 가져오기
  const category = searchParams.get('category');
  const searchValue = searchParams.get('search');

  useInfinitePlaces(category, userId, searchValue);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const trimSearch = search.trim();

      navigate(`/?search=${trimSearch}`);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleAuthAction = async () => {
    if (isLogin) {
      logoutUser();
      toast('로그아웃 되었습니다.');
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.SIGNIN);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className="fixed h-16 w-full z-50 bg-white border-b-1 border-gray-300">
      <nav className="flex px-5 h-full items-center gap-4 md:gap-7 ">
        <div className="flex-grow ">
          <Link to="/" className="inline-block">
            <img
              src="/logo.png"
              alt="logo"
              className="h-12 w-auto max-w-[120px] sm:h-16 sm:max-w-[150px] mt-2"
            />
          </Link>
        </div>
        <div className="flex items-center border rounded-lg px-2 py-1 text-sm w-8 sm:w-36 transition-all ease-in-out duration-300 focus-within:w-36">
          <input
            className="w-full outline-none"
            type="text"
            value={search}
            onChange={handleSearch}
            onClick={() => setSearch('')}
          />
        </div>
        <div className="flex gap-3 sm:gap-5">
          {isLogin && (
            <Link to={ROUTES.MYPAGE} className="text-sm sm:text-base w-auto">
              마이페이지
            </Link>
          )}
          <button onClick={handleAuthAction} className="text-sm sm:text-base w-auto">
            {isLogin ? '로그아웃' : '로그인'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
