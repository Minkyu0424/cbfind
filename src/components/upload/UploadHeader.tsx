interface UploadHeaderProps {
  isFound: boolean;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
}
const UploadHeader = ({ isFound, setIsFound }: UploadHeaderProps) => {
  return (
    <div className="w-full flex justify-between border-l-8 border-l-[var(--main)] pl-3 py-2.5 text-xl font-semibold">
      <p>글 작성</p>
      <div className="text-[10px] flex gap-1 font-medium">
        <p
          className={`flex items-center px-2 py-0.5 rounded cursor-pointer text-center ${
            isFound ? "bg-gray-200 text-black" : "bg-[var(--main2)] text-white"
          }`}
          onClick={() => setIsFound(false)}
        >
          찾아주세요
        </p>
        <p
          className={`flex items-center px-2 py-0.5 rounded cursor-pointer text-center ${
            isFound ? "bg-[var(--main2)] text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => setIsFound(true)}
        >
          찾았어요
        </p>
      </div>
    </div>
  );
};

export default UploadHeader;
