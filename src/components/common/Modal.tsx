interface ModalProps {
  title: string;
  content: string;
  buttonText: string;
  onClose: () => void;
}

export const Modal = ({ title, content, buttonText, onClose }: ModalProps) => {
  return (
    <div className="w-[280px] p-8 flex flex-col items-center bg-white rounded-xl shadow">
      <div className="flex flex-col gap-3 pb-5 items-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="font-medium text-xs text-[var(--sub)]">{content}</p>
      </div>
      <button
        onClick={onClose}
        className="w-full flex items-center justify-center bg-[var(--main2)] text-white text-sm font-medium py-3 rounded cursor-pointer"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Modal;
