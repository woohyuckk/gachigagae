import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { supabase } from '../libs/api/supabaseClient';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (formData) => {
    // 회원가입 로직 구현
    const { email, password, passwordRecheck, nickname } = formData;

    // 유효성 검사
    if (password.length < 6) {
      setErrorMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (password !== passwordRecheck) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          },
        },
      });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      alert('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
      navigate('/signin');
    } catch (err) {
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
      throw new Error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-extrabold w-full">회원가입</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div>
          <p className="mt-7">
            이미 계정이 있으신가요?&nbsp;
            <Link to="/signin" className="text-red-500 font-semibold">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
