import { FadeLoader } from 'react-spinners';

export default function Loading({ notification }) {
  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <FadeLoader color="rgb(56 189 248)" />
      {notification && <p className="mt-[20px]">{notification}</p>}
    </div>
  );
}
