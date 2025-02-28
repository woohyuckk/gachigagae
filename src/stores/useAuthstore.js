import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

const initialState = {
  id: '',
  email: '',
  nickname: '',
  profile_img_url: '',
};

const useAuthStore = create(
  // persist -> userinfo localstorage저장
  persist(
    immer((set) => {
      // immer 삭제ㅋ
      return {
        isLogin: false, // 새로고침 시 당연히 false -> persist 쓰기
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
    }),
    {
      name: 'gachigagae-auth',
    }
  )
);

export default useAuthStore;
