interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ title, message, onConfirm, onCancel }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="bg-white w-80 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-sm text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
