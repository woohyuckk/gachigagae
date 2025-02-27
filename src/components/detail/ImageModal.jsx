const ImageModal = ({ handleModalClose: closeModal, modalImage }) => {
  return (
    <div
      className="fixed inset-0 bg-grey bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-md"
      onClick={closeModal}
    >
      <div className="relative bg-white p-4 rounded-lg shadow-lg min-w-1/2 min-h-1/2">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white p-2  w-8 h-8 rounded-full flex items-center justify-center  hover:bg-red-700"
          onClick={closeModal}
        >
          ✖
        </button>
        <img src={modalImage} alt="modal" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default ImageModal;
