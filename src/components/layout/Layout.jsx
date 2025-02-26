import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w">
      Layout
      <Outlet />
    </div>
  );
};

export default Layout;
