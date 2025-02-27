
const CommentsSection = () => {
  return (
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
  )
}

export default CommentsSection