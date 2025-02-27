import { create } from 'zustand';

const initialState = {
  authId: '',
  email: '',
  nickname: '',
};

const useAuthStore = create(() => ({
  isLogin: false,
  userInfo: initialState,
}));

export default useAuthStore;
