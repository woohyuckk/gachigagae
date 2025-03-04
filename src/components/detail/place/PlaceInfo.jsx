const PlaceInfo = ({ placeInfo }) => {
  const description = placeInfo.description.split('|');
  const [open, close, parking, isAccompanied, exeption] = description;
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-2 text-grey">
      <p>⏰ {open}</p>
      <p>🚪 {close}</p>
      <p>📍 {placeInfo.address}</p>
      <p>📞 전화번호:{placeInfo.tel || '❌'}</p>
      <p>💡 {isAccompanied}</p>
      <p>⚠️ {exeption}</p>
      <p>🚗 {parking}</p>
    </div>
  );
};

export default PlaceInfo;
