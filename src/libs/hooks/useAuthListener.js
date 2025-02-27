import { useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';

const useAuthListener = () => {
  const setUserInfo = useAuthStore().setUserInfo;

  useEffect(() => {
    // 인증 상태 변경 감지 및 자동 업데이트
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      console.log(session);
      const userInfo = {
        id: session?.user.id,
        email: session?.user.user_metadata.email,
      };
      setUserInfo(userInfo);
      return () => {
        subscription.unsubscribe(); // Cleanup when unmounting
      };
    });
  }, []);
};

export default useAuthListener;
