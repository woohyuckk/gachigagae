import { create } from 'zustand';
import { supabase } from '../libs/api/supabaseClient';

const useAuthStore = create(() => ({
  isLogin: false,
  loginedUser: null,
}));

export default useAuthStore;
