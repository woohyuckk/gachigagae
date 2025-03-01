import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { useAuthMutate } from '../libs/hooks/useAuth.api';

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { signUp, updateUserInfo } = useAuthMutate();

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

    try {
      await signUp({ email, password }); // 회원가입 처리
      await updateUserInfo({ nickname, email }); // public.users 닉네임 업데이트
      alert('회원가입이 완료되었습니다!');
      navigate('/signin');
    } catch (error) {
      setErrorMessage('회원가입 및 닉네임 저장 과정에서 오류가 발생했습니다.');
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
