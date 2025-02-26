import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const SignIn = () => {
  // const navigate = useNavigate();
  // const { onLogin } = useAuthStore((state) => state);

  const handleLogin = async (formData) => {
    // try {
    //   const { accessToken } = await login(formData);
    //   onLogin(accessToken);
    //   navigate('/');
    // } catch (error) {
    //   throw new Error(error);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-extrabold w-full">로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div>
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
