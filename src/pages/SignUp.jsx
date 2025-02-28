import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/api/supabaseClient';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (formData) => {
    const { email, password, passwordRecheck, nickname } = formData;

    // 유효성 검사
    const PASSWORD_LENGTH = 6;
    if (password.length < PASSWORD_LENGTH) {
      setErrorMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (password !== passwordRecheck) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 처리
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
      throw new Error(error);
    }

    // public.users 테이블 내 nickname 저장
    try {
      // const { error } = await supabase.from('users').upsert({ email, nickname });
      const { error } = await supabase.from('users').update({ nickname }).eq('email', email);

      if (error) {
        setErrorMessage(error.message);
        return;
      }
      navigate('/signin');
    } catch (error) {
      setErrorMessage('닉네임 저장 중 오류가 발생했습니다.');
      throw new Error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
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
