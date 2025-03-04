import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useToggleLikes } from '../../libs/hooks/useLikes';
import useAuthStore from '../../stores/useAuthstore';
import { useSearchParams } from 'react-router-dom';

/**
 * * 장소의 좋아요 기능을 추가한 좋아요 버튼 컴포넌트
 * @param {boolean} props.isLiked - 현재 장소의 좋아요 여부 (필수)
 * @param {number} props.placeId - 현재 장소의 id (필수)
 * @param {number} props.size - 좋아요 버튼의 사이즈 (선택)
 * @param {string} props.className - 더 추가하고 싶은 css 속성
 * @example
 * <LikePlaceButton size={30} placeId={id} isLiked={isLiked} />
 */
export const LikePlaceButton = ({ isLiked, placeId, ...props }) => {
  const [searchParams] = useSearchParams();
  const { id: userId } = useAuthStore((state) => state.userInfo);

  const category = searchParams.get('category');
  const searchValue = searchParams.get('search');
  const { toggleLike } = useToggleLikes(isLiked, userId, category, searchValue);

  // 좋아요 버튼 클릭 리스너
  const handleClickLikeButton = (e) => {
    e.stopPropagation();
    toggleLike({ userId, placeId });
  };

  return userId && <LikeButton isLiked={isLiked} onClick={handleClickLikeButton} {...props} />;
};

/**
 * * 좋아요 버튼 컴포넌트
 * @param {number} props.size - 좋아요 버튼 사이즈 (디폴트 30)
 * @param {string} props.className - 더 추가하고 싶은 css 속성
 * @param {Function} props.onClick - 좋아요 버튼 누를 때 온클릭 이벤트
 * @param {boolean} props.isLiked - 좋아요 여부
 */
const LikeButton = ({ size = 24, className, ...props }) => {
  return (
    <VariantButton
      size={size}
      className={`cursor-pointer hover:scale-105 active:scale-95 ${className}`}
      {...props}
    />
  );
};

/**
 * * 좋아요 여부에 따라 채워진/빈 하트 컴포넌트를 반환
 */
const VariantButton = ({ isLiked, className, ...props }) => {
  return isLiked ? (
    <IoHeart className={`text-[#FF5F5F] ${className}`} {...props} />
  ) : (
    <IoHeartOutline className={`text-gray-400 ${className}`} {...props} />
  );
};
