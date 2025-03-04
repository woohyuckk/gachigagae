import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/Router';
import AuthListener from './components/auth/AuthListener';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthListener />
        <ToastContainer autoClose={2000} />
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
