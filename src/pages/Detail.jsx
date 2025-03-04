import CommentsSection from '../components/detail/comment/CommentsSection';
import ImageModal from '../components/detail/place/ImageModal';
import { useState } from 'react';
import { useGetPlaceInfo } from '../libs/hooks/useGetPlaces';
import PlaceSection from '../components/detail/place/PlaceSection';
import Loading from '../components/common/Loading';

/**
 * @param {object} : placeInfo place_id에 해당하는 장소정보
 * @returns
 */
const Detail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const { data: placeInfo, isLoading, error } = useGetPlaceInfo();
  // 이미지 모달 열기
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <Loading notification="정보를 불러오는 중입니다." />;
  }
  if (error) return <div>{error}</div>;

  return (
    <section className="flex flex-col min-w-[450px] max-w-[1400px] my-16 mx-auto md:flex-row items-start gap-6 p-6 border-2 rounded-2xl">
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
