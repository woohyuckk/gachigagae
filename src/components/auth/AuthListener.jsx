import { useEffect, useRef } from 'react';
import { supabase } from '../../libs/api/supabaseClient';
import { useAuthMutate } from '../../libs/hooks/useAuth.api';

const useAuthStateChange = (callback) => {
  const currentSession = useRef(null);

  // 이벤트 필터링: 현재 세션과 새로운 세션의 사용자 ID를 비교하여, 동일한 사용자일 경우 이벤트를 무시
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.id === currentSession.current?.user?.id) return;
      currentSession.current = session;
      callback(event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

const AuthListener = () => {
  const { loginUserInfo, logoutUser } = useAuthMutate();

  useAuthStateChange((event, session) => {
    if (session) {
      const id = session.user.id;
      loginUserInfo({ id });
    }
    if (event === 'SIGNED_OUT') {
      logoutUser();
    }
  });
  return;
};

export default AuthListener;
