import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/Router';
import AuthListener from './components/auth/AuthListener';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthListener />;
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
