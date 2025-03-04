const ImageModal = ({ handleModalClose: closeModal, modalImage }) => {
  return (
    <div
      className="fixed  inset-0 bg-amber-100/20 flex items-center justify-center z-50 backdrop-blur-md"
      onClick={closeModal}
    >
      <div className="relative  bg-white p-4 rounded-lg shadow-lg w-full md:w-[50vw] ">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white p-2  w-8 h-8 rounded-full flex items-center justify-center  hover:bg-red-700"
          onClick={closeModal}
        >
          ✖
        </button>
        <img
          src={modalImage}
          alt="modal"
          className="w-full  max-h-[600px] md:w-full  object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
