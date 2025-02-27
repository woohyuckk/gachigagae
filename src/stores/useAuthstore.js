import { create } from 'zustand';
import { supabase } from '../libs/api/supabaseClient';

const useAuthStore = create(() => ({
  isLogin: false,
  loginedUser: null,
}));

// 인증 상태 변경 감지 및 자동 업데이트
supabase.auth.onAuthStateChange((_, session) => {
  useAuthStore.setState({
    isLogin: !!session,
    loginedUser: session?.user || null,
  });
});

export default useAuthStore;
