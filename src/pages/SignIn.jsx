import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/api/supabaseClient';
import { useState } from 'react';
import AuthForm, { LoginButton } from '../components/auth/AuthForm';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

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

      toast('로그인에 성공했습니다!');
      navigate('/');
    } catch (err) {
      if (err.message === 'Invalid login credentials') {
        setErrorMessage('사용자 아이디 또는 비밀번호가 올바르지 않습니다.');
        throw err;
      }
      setErrorMessage('로그인 중 오류가 발생했습니다.');
      throw new Error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 max-w-md w-full border-2 rounded-2xl">
        <h1 className="text-2xl font-extrabold w-full">로그인</h1>
        <AuthForm mode="login" onSubmit={handleSignIn} errorMessage={errorMessage} />
        <div>
          <LoginButton
            type="button"
            className={
              'w-full bg-grey hover:bg-gray-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group'
            }
            onClick={handleGoogleLogin}
          >
            <div className="flex items-center justify-center gap-2">
              <FcGoogle size={30} className="transition-transform group-hover:rotate-180" />
              <span>구글 로그인</span>
            </div>
          </LoginButton>
          <p className="mt-7">
            계정이 없으신가요?&nbsp;
            <Link to="/signup" className="text-red-300 font-semibold hover:text-red-500">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
