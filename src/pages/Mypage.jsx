import { useEffect, useState } from 'react';
import { supabase } from '../libs/api/supabaseClient';

const Mypage = () => {
  // 닉네임 상태
  const [nickname, setNickName] = useState('');
  const [userId, setUserId] = useState(null);

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error('사용자 정보를 가져오는 데 실패:', error.message);
        return;
      }
      setUserId(user.user?.id);
    };

    fetchUser();
  }, []);

  // 입력 필드 핸들러
  const handleInputChange = (e) => {
    const { value } = e.target;
    setNickName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const { data, error } = await supabase.from('users').update({ nickname }).eq('id', userId);

    if (error?.code === '23505') {
      alert('중복된 닉네임이 있습니다.');
      return;
    }

    //이상한 요청을 보내서 데이터에 null값이 들어올때
    if (data === null) {
      alert('잘못된 요청입니다. 잠시후 다시 시도해주세요');
      return;
    } else {
      alert('업데이트 성공!');
    }
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-primary-color mb-6">프로필 수정</h1>
          <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <label className="p-2">닉네임</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleInputChange}
              placeholder="닉네임"
              required
              className="w-full p-4 border border-gray-300 rounded-lg mt-2"
            />
            <button className="rounded-full w-full bg-blue-500 text-white py-3 hover:bg-secondary-color transition duration-300 hover:bg-blue-600">
              프로필 업데이트
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mypage;
