import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthListener from './libs/hooks/useAuthListener';
import Router from './routes/Router';

const App = () => {
  const queryClient = new QueryClient();
  useAuthListener();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
