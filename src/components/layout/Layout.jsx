import { Outlet } from 'react-router-dom';
import Main from './Main';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header/>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;
