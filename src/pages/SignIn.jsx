import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/api/supabaseClient';
import { useState } from 'react';
import AuthForm, { LoginButton } from '../components/auth/AuthForm';

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (formData) => {
    const { email, password } = formData;

    // 유효성 검사
    if (!email.trim() || !password.trim()) {
      setErrorMessage('이메일과 비밀번호를 올바르게 입력해주세요.');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
        throw error;
      }

      alert('로그인에 성공했습니다!');
      navigate('/');
    } catch (err) {
      setErrorMessage('로그인 중 오류가 발생했습니다.');
      throw new Error(err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-extrabold w-full">로그인</h1>
        <AuthForm mode="login" onSubmit={handleSignIn} errorMessage={errorMessage} />
        <div>
          <LoginButton type="button" color="grey" className={'w-full'}>
            구글 로그인
          </LoginButton>
          <p className="mt-7">
            계정이 없으신가요?&nbsp;
            <Link to="/signup" className="text-red-500 font-semibold">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
