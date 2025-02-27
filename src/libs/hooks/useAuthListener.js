import { useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';

const useAuthListener = () => {
  useEffect(() => {
    // 인증 상태 변경 감지 및 자동 업데이트
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      useAuthStore.setState({
        isLogin: !!session,
        loginedUser: session?.user.user_metadata || null,
      });

      return () => {
        authListener.subscription.unsubscribe(); // Cleanup when unmounting
      };
    });
  }, []);
};

export default useAuthListener;
