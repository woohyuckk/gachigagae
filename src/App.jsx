import useAuthListener from './libs/hooks/useAuthListener';
import Router from './routes/Router';

const App = () => {
  useAuthListener();

  return (
    <>
      <Router />
    </>
  );
};

export default App;
