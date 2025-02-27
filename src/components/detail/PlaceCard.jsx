import { useState } from 'react';
import CommentsSection from './CommentsSection';
import ImageModal from './ImageModal';
import PlaceSection from './PlaceSection';

const PlaceCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalImage : '/public/default-image.png'
  });




  // 이미지 클릭 시 모달 열기
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="flex flex-col md:flex-row items-start gap-6 p-6 bg-pink-100 min-h-screen">
      {/* 🐾 게시글 영역 */}
      <PlaceSection handleModalOpen={openModal} />
      {/* 💬 코멘트 영역 */}
      <CommentsSection />
      {/* 📸 이미지 모달 */}
      {modalOpen && <ImageModal handleModalClose={closeModal} modalImage={modalImage} />}
    </section>
  );
};

export default PlaceCard;
