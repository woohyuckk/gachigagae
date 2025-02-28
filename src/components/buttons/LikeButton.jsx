import { useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

/**
 * * 좋아요 버튼 컴포넌트
 * @param {Object} props
 * @param {number} props.size - 좋아요 버튼 사이즈 (디폴트 30)
 * @param {Function} props.onClick - 좋아요 버튼 누를 때 온클릭 이벤트
 * @param {string} props.className - 더 추가하고 싶은 css 속성
 * @param {boolean} props.status - 좋아요 여부
 * @example
 * <LikeButton size={24} onClick={handleClickLikeButton}/>
 * size, onClick 둘 다 선택입니다.
 */
const LikeButton = ({ size = 30, onClick, className, status = false }) => {
  const [isLiked, setIsLiked] = useState(status);

  const handleClickLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onClick();
  };

  return (
    <VariantButton
      size={size}
      className={`cursor-pointer hover:scale-105 active:scale-95 ${className}`}
      isLiked={isLiked}
      onClick={handleClickLike}
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

export default LikeButton;
