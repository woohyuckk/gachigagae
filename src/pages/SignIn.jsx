import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../libs/api/supabaseClient';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import DefaultButton from '../components/buttons/DefaultButton';
import { AUTH_ERROR_MESSAGES } from '../constants/authValidation';
import { TOAST_MSG } from '../constants/toastMessages';

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (formData) => {
    const { email, password } = formData;

    // 유효성 검사
    if (!email.trim() || !password.trim()) {
      setErrorMessage(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(AUTH_ERROR_MESSAGES.LOGIN_FAILED);
        throw error;
      }
      toast(TOAST_MSG.SIGNIN_CLEAR);
      navigate('/');
    } catch (err) {
      if (err.message === 'Invalid login credentials') {
        setErrorMessage(AUTH_ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD);
        throw err;
      }
      setErrorMessage(AUTH_ERROR_MESSAGES.LOGIN_ERROR);
      throw new Error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://nbc-outsourcing-project.vercel.app/auth/callback',
        },
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
          <DefaultButton
            className="w-full mt-2 h-11 bg-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <div className="flex items-center gap-2 mr-8">
              <FcGoogle size={30} className="transition-transform group-hover:rotate-180 " />
              <span>구글 로그인</span>
            </div>
          </DefaultButton>
        </div>

        <p className="mt-7">
          계정이 없으신가요?&nbsp;
          <Link to="/signup" className="text-red-300 font-semibold hover:text-red-500">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
