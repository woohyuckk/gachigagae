import HOME_CONSTANT from '../../constants/homeConstant';

const SideBar = ({ onClick }) => {
  return (
    <aside className="fixed left-0 top-1/4 h-50 bg-white shadow-md border-r p-4 rounded-2xl md:h-80 lg:left-24 xl:left-40">
      <div>
        <ul className="space-y-4  text-[10px] md:text-lg">
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
