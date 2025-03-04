import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { useAuthMutate } from '../libs/hooks/useAuth.api';
import { toast } from 'react-toastify';
import { AUTH_ERROR_MESSAGES, AUTH_VALID_LENGTH } from '../constants/authValidation';

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { signUp, updateUserInfo } = useAuthMutate();

  const handleSignup = async (formData) => {
    const { email, password, passwordRecheck, nickname } = formData;

    // 유효성 검사
    if (/\s/.test(email)) {
      setErrorMessage(AUTH_ERROR_MESSAGES.EMAIL_NO_SPACES);
      return;
    }

    if (password !== passwordRecheck) {
      setErrorMessage(AUTH_ERROR_MESSAGES.PASSWORD_MISMATCH);
      return;
    }
    if (/\s/.test(password)) {
      setErrorMessage(AUTH_ERROR_MESSAGES.PASSWORD_NO_SPACES);
      return;
    }
    if (password.length < AUTH_VALID_LENGTH.PASSWORD_LENGTH) {
      setErrorMessage(AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT);
      return;
    }

    if (/\s/.test(nickname)) {
      setErrorMessage(AUTH_ERROR_MESSAGES.NICKNAME_NO_SPACES);
      return;
    }
    if (
      nickname.length < AUTH_VALID_LENGTH.MIN_NICKNAME_LENGTH ||
      nickname.length > AUTH_VALID_LENGTH.MAX_NICKNAME_LENGTH
    ) {
      setErrorMessage(
        AUTH_ERROR_MESSAGES.NICKNAME_LENGTH(
          AUTH_VALID_LENGTH.MIN_NICKNAME_LENGTH,
          AUTH_VALID_LENGTH.MAX_NICKNAME_LENGTH
        )
      );
      return;
    }

    try {
      await signUp({ email, password }); // 회원가입 처리
      await updateUserInfo({ nickname, email }); // public.users 닉네임 업데이트
      toast('회원가입이 완료되었습니다!');
      navigate('/signin');
    } catch (error) {
      setErrorMessage(AUTH_ERROR_MESSAGES.SIGNUP_FAILED);
      throw new Error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 max-w-md w-full border-2 rounded-2xl">
        <h1 className="text-2xl font-extrabold w-full">회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignup} errorMessage={errorMessage} />
        <div>
          <p className="mt-7">
            이미 계정이 있으신가요?&nbsp;
            <Link to="/signin" className="text-red-300 font-semibold hover:text-red-500">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
