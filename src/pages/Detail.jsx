import PlaceSection from '../components/detail/PlaceSection';
import CommentsSection from '../components/detail/CommentsSection';
import ImageModal from '../components/detail/ImageModal';
import { useState } from 'react';
import { useGetPlaceInfo } from '../libs/hooks/useGetPlaces';

const Detail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const { data: placeInfo, isLoading, error } = useGetPlaceInfo();
  // 이미지 클릭 시 모달 열기
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  // 모달 닫기c
  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="flex flex-col min-w-[450px] max-w-[1400px]  mx-auto md:flex-row items-start gap-6 p-6 bg-pink">
      {/* 🐾 게시글 영역 */}
      <PlaceSection placeInfo={placeInfo} handleModalOpen={openModal} />
      {/* 💬 코멘트 영역 */}
      <CommentsSection />
      {/* 📸 이미지 모달 */}
      {modalOpen && <ImageModal handleModalClose={closeModal} modalImage={modalImage} />}
    </section>
  );
};

export default Detail;
