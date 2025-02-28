import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../libs/api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';
import useGetUserInfo from '../../libs/hooks/useGetUserInfo';

const useAuthStateChange = (callback) => {
  const currentSession = useRef(null);

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
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const logout = useAuthStore((state) => state.logout);
  const { data: userData, isPending, Error } = useGetUserInfo();
  const [flag, setFlag] = useState(false);

  useAuthStateChange((event, session) => {
    // if (event === 'SIGNED_IN') {
    // 로그인 시 처리 로직
    console.log(event);
    if (event === 'SIGNED_IN') {
      const userInfo = {
        id: session.user.id,
        email: session.user.email,
        nickname: userData?.nickname || '',
        profile_img_url: userData?.profile_img_url || '',
      };

      setUserInfo(userInfo);
    } else if (event === 'SIGNED_OUT') {
      logout();
    }
  });

  useEffect(() => {
    if (!userData) {
      return;
    }
    if (flag) {
      return;
    }
    const userInfo = {
      nickname: userData?.nickname || '',
      profile_img_url: userData?.profile_img_url || '',
    };

    setUserInfo(userInfo);
    setFlag(true);
  }, [userData]);

  if (isPending) return;
  if (Error) return;

  return <></>;
};

export default AuthListener;
