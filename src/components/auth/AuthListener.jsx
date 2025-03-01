import { useEffect, useRef } from 'react';
import { supabase } from '../../libs/api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';
import { useAuthMutate } from '../../libs/hooks/useAuth.api';

const useAuthStateChange = (callback) => {
  const currentSession = useRef(null);
  const { loginUserInfo } = useAuthMutate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('첫번째 유즈 이펙트.=====>', event, session);
      if (session?.user?.id === currentSession.current?.user?.id) return;
      currentSession.current = session;
      callback(event, session);

      if (session) {
        const id = session.user.id;
        loginUserInfo({ id });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

const AuthListener = () => {
  const logout = useAuthStore((state) => state.logout);

  useAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      logout();
    }
  });

  return <></>;
};

export default AuthListener;
