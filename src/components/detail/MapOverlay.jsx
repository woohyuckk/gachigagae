import { Link } from 'react-router-dom';

const MapOverlay = ({ placeInfo, handleOverlayToggle }) => {
  const { image, url, title, address } = placeInfo;
  return (
    <div className="w-[160px] h-auto bg-white border border-black shadow-lg rounded-md p-1 flex flex-col justify-center">
      {/* 헤더 */}
      <div className="flex justify-between items-center  border-b border-black px-1">
        <span className="text-[10px] font-bold  ">{title}</span>
        <button onClick={handleOverlayToggle} className="text-xs font-bold">
          X
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="flex items-center mt-1 px-1">
        {/* 이미지 */}
        <img
          src={image}
          alt="Map location"
          className="w-15 h-15 border border-black object-cover rounded"
        />
        <div className="ml-1">
          {/* 주소 */}
          <div className="text-[10px] font-semibold break-words whitespace-pre-wrap">{address}</div>
          {/* 홈페이지 링크 */}
          {url && (
            <Link
              to={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] text-blue-600 hover:underline"
            >
              사이트 바로가기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapOverlay;
