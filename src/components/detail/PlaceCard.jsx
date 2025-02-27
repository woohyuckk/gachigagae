import  { useState } from 'react'

const PlaceCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

    // 이미지 클릭 시 모달 열기
    const openModal = (imageSrc) => {
      setModalImage(imageSrc);
      setModalOpen(true);
    };
  
    // 모달 닫기
    const closeModal = () => {
      setModalOpen(false);
  };
  
  return (
    <section className="flex flex-col md:flex-row items-start gap-6 p-6 bg-pink-100 min-h-screen">
      {/* 🐾 게시글 영역 */}
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
          <div className="w-1/2 ">
            <img
              src="/public/default-image.png"
              alt="default-image"
              className="w-full h-full object-cover rounded-lg shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={() => openModal('/public/default-image.png')}
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

      {/* 💬 코멘트 영역 */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">💬 코멘트 작성</h2>

        {/* 댓글 입력 */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full border p-2 rounded-lg mt-2 focus:ring-2 focus:ring-pink-400 outline-none"
            placeholder="댓글을 입력하세요..."
          />
          <button className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-all">
            작성하기
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="mt-6">
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-700">🐾 강아지: 정말 귀여운 가게네요!</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50 mt-2">
            <p className="text-gray-700">🐱 고양이: 다음에 꼭 가볼게요! 😻</p>
          </div>
        </div>
      </div>

      {/* 📸 이미지 모달 */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-grey bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-md"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl ">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2  w-8 h-8 rounded-full flex items-center justify-center  hover:bg-red-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <img src={modalImage} alt="modal" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </section>
  )
}

export default PlaceCard