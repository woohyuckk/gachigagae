import { create } from 'zustand';

const useAuthStore = create(() => ({
  isLogin: false,
  userInfo: {
    email: '',
    nickname: '',
  },
}));

export default useAuthStore;
