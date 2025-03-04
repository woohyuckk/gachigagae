import { useState } from 'react';

const AuthForm = ({ mode, onSubmit, errorMessage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordRecheck: '',
    nickname: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="flex flex-col gap-2 mt-4" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="w-full p-4 border border-gray-300 rounded-lg"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleOnChange}
        placeholder="이메일 주소"
        required
      />
      <input
        className="w-full p-4 border border-gray-300 rounded-lg"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleOnChange}
        placeholder="비밀번호"
        required
      />
      {mode === 'signup' && (
        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="passwordRecheck"
            value={formData.passwordRecheck}
            onChange={handleOnChange}
            placeholder="비밀번호 확인"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleOnChange}
            placeholder="닉네임"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
        </div>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <LoginButton type="submit">{mode === 'login' ? '로그인' : '회원가입'}</LoginButton>
    </form>
  );
};

export default AuthForm;

export const LoginButton = ({ type, className, ...props }) => {
  return (
    <button
      type={type}
      className={`rounded-full bg-blue-500 px-7 py-3 mt-3 text-lg leading-8 font-semibold text-white shadow-lg shadow-gray-500/30 hover:bg-blue-600 cursor-pointer ${className}`}
      {...props}
    />
  );
};
