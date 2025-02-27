import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const initialState = {
  id: '',
  email: '',
  nickname: '',
  profile_img_url: '',
};

const useAuthStore = create(
  immer((set) => {
    return {
      isLogin: false,
      userInfo: initialState,
      setUserInfo: (userInfo) => {
        set((state) => {
          state.userInfo = { ...state.userInfo, ...userInfo };
          state.isLogin = true;
        });
      },
      logout: () => {
        set((state) => {
          state.userInfo = initialState;
          state.isLogin = false;
        });
      },
    };
  })
);

export default useAuthStore;
