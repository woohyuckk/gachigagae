import LikeItem from './LikeItem';

export default function LikesList({ places, navigate }) {
  return (
    <div className="relative h-auto md:h-[600px]">
      <div className="h-full overflow-x-auto overflow-y-hidden md:overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200/80 scrollbar-track-transparent">
        <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 px-2 md:pl-2 md:pr-8 min-h-[300px] md:min-h-[600px]">
          {places.map((place) => (
            <LikeItem key={place.id} place={place} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
