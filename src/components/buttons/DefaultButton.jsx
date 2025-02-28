/**
 * * 색깔별 디폴트 버튼
 * @param {Object} props
 * @param {string} props.text - 버튼에 들어갈 텍스트
 * @param {string} props.className - 더 추가하고 싶은 css 속성
 * @param {Function} props.onClick - 버튼 클릭 이벤트
 * @param {string} props.color - 색깔 ('yellow', 'pink', 'orange'), 디폴트 'yellow'
 * @example
 * <DefaultButton color="pink">댓글 달기</DefaultButton>
 * css 속성을 고치고 싶다면 className을 지정해주어도 됩니다.
 */
const DefaultButton = ({ className, onClick, color = 'yellow', children }) => {
  return (
    <button
      className={`bg-[var(--color-${color})] font-semibold py-2 px-4 rounded-lg hover:brightness-105 active:brightness-95 cursor-pointer border ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
