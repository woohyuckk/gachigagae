
const PlaceSection = ({handleModalOpen:openModal}) => {
  return (
    <div className="w-full md:w-2/3 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">🐶 지수네 과일가게 🐱</h1>

        {/* 카테고리 */}
        <div className="flex gap-2 mt-2">
          <span className="bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full">
            #과일
          </span>
          <span className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
            #귀여운동물
          </span>
        </div>

        {/* 대표 이미지 */}
        <div className="mt-4 flex">
          <img
            src="/public/default-image.png"
            alt="default-image"
            className="w-1/2 mx-auto aspect-square object-contain rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => openModal('/public/default-image.png')}
          />
        </div>

        {/* 상세 정보 */}
        <div className="mt-4 flex gap-4">
          {/* 썸네일 */}
          <div className="w-1/2 h-72">
            <img
              src="/public/default-image.png"
              alt="default-image"
              className="w-full h-full object-cover rounded-lg shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          </div>

          {/* 정보 텍스트 */}
          <div className="flex flex-col gap-2 text-gray-700">
            <p>⏰ 운영시간: 10:00 - 20:00</p>
            <p>🚪 휴무일: 매주 월요일</p>
            <p>⚠️ 제한사항: 반려동물 동반 가능</p>
            <p>📍 주소: 서울특별시 강남구</p>
            <p>📞 전화번호: 02-1234-5678</p>
            <p>💡 특이사항: 귀여운 강아지와 고양이들이 함께 있어요!</p>
          </div>
        </div>
      </div>
  )
}

export default PlaceSection