import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLogin] = useState(true);

  return (
    <header className="fixed h-28 w-full">
      {isLogin ? (
        <Link to="/signin">로그인</Link>
      ) : (
        <>
          <Link to="/mypage">마이페이지</Link>
          <button>로그아웃</button>
        </>
      )}
    </header>
  );
};

export default Header;
