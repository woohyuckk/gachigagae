import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/layout/Layout';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import useAuthStore from '../stores/useAuthstore';
import { toast } from 'react-toastify';

const Router = () => {
  const { isLogin } = useAuthStore();

  // * 인증된 사용자만 접근할 수 있는 라우트
  const PrivateRoute = () => {
    if (!isLogin) {
      toast('로그인이 필요합니다.');
      return <Navigate to="/signin" />;
    }

    return <Outlet />;
  };

  // * 미인증 사용자만 접근할 수 있는 라우트
  const PublicRoute = () => {
    return !isLogin ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* shared 페이지 */}

          <Route path="/" element={<Home />} />
          {/* <Route path="/search" element={<Home />} /> */}
          <Route path="/detail/:id" element={<Detail />} />
          {/* public 라우트 */}
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          {/* private 라우트 */}
          <Route element={<PrivateRoute />}>
            <Route path="/mypage" element={<Mypage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
