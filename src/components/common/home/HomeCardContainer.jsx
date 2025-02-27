import HomeCard from './HomeCard';

const HomeCardContainer = ({ places }) => {
  return (
    <div className="lg:w-full lg:max-w-3xl m-auto flex flex-wrap gap-7 justify-evenly p-4 sm:w-1/2 md:gap-20">
      {places.map((item, idx) => {
        return (
          <article
            key={item.id}
            className={
              idx % 2 === 1
                ? 'lg:w-1/3 sm:w-full w-3/4 h-80 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col '
                : 'lg:w-1/3 sm:w-full w-3/4 h-80 bg-white shadow-lg rounded-2xl overflow-hidden p-4 relative flex-col lg:top-16  '
            }
          >
            <HomeCard {...item} />
          </article>
        );
      })}
    </div>
  );
};

export default HomeCardContainer;
