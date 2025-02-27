import HOME_CONSTANT from '../../../constants/HomeConstant';

const SideBar = ({ onClick }) => {
  return (
    <aside className="fixed left-0 top-1/4 h-96 bg-white shadow-md border-r p-4 rounded-2xl xl:left-50 xl:w-32 lg:left-20 sm:left-0 sm:w-fit">
      <div>
        <ul className="space-y-4  text-xs md:text-lg">
          <li className="text-gray-700 hover:text-black cursor-pointer" onClick={onClick}>
            {HOME_CONSTANT.CATEGORY_HOME}
          </li>
          <li className="text-gray-700 hover:text-black cursor-pointer" onClick={onClick}>
            {HOME_CONSTANT.CATEGORY_RESTAURANT}
          </li>
          <li className="text-gray-700 hover:text-black cursor-pointer" onClick={onClick}>
            {HOME_CONSTANT.CATEGORY_CAFE}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
