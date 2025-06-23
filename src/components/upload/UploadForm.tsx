import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InitUploadFormData } from "../../constants/items";
import type { UploadFormTypes } from "../../types/common";
import Input from "../common/Input";
import Modal from "../common/Modal";

interface UploadFormProps {
  isFound: boolean;
}

const UploadForm = ({ isFound }: UploadFormProps) => {
  const [uploadForm, setUploadForm] =
    useState<UploadFormTypes>(InitUploadFormData);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const formTitle = isFound ? "습득" : "분실";

  const handleUpload = () => {
    console.log("Upload Form Data:", uploadForm);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="size-full flex flex-col items-center pb-10">
      <div className="w-full flex flex-col gap-2">
        <p className="text-xs text-[var(--sub)]">{`${formTitle}물 이름`}</p>
        <Input
          styleType={"upload"}
          value={uploadForm?.title}
          placeholder={`${formTitle}물 이름을 입력해주세요`}
          onChange={(e) =>
            setUploadForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <p className="w-full text-end text-xs text-[var(--sub)]">
          {uploadForm?.title.length} / 30
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-xs text-[var(--sub)]">{`${formTitle} 장소`}</p>
        <Input
          styleType={"upload"}
          value={uploadForm?.place}
          placeholder={`${formTitle}물 장소를 입력해주세요`}
          onChange={(e) =>
            setUploadForm((prev) => ({
              ...prev,
              place: e.target.value,
            }))
          }
        />
        <p className="w-full text-end text-xs text-[var(--sub)]">
          {uploadForm?.place.length} / 30
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-xs text-[var(--sub)]">{`${formTitle} 시간`}</p>
        <div className="flex gap-6">
          <input
            type="date"
            value={uploadForm.date.split("T")[0]}
            onChange={(e) =>
              setUploadForm((prev) => ({
                ...prev,
                date: `${e.target.value}T${prev.date.split("T")[1]}`,
              }))
            }
            className="flex-1 border border-[var(--gray)] rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="time"
            value={uploadForm.date.split("T")[1].slice(0, 5)}
            onChange={(e) =>
              setUploadForm((prev) => ({
                ...prev,
                date: `${prev.date.split("T")[0]}T${e.target.value}:00`,
              }))
            }
            className="flex-1 border border-[var(--gray)] rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <p className="w-full text-end text-xs text-[var(--sub)]">
          {uploadForm?.place.length} / 30
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-xs text-[var(--sub)]">부가 설명</p>
        <textarea
          value={uploadForm?.content}
          placeholder={`${formTitle}물에 대한 상세한 내용을 적어주세요`}
          onChange={(e) =>
            setUploadForm((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          className="w-full px-4 py-3 h-[120px] border border-[var(--gray)] rounded-lg resize-none text-sm focus:outline-none"
        />
        <p className="w-full text-end text-xs text-[var(--sub)]">
          {uploadForm?.content.length} / 200
        </p>
      </div>
      <div className="w-full flex flex-col gap-2 pb-5">
        <p className="text-xs text-[var(--sub)]">분실물 사진</p>
        <label
          htmlFor="image-upload"
          className="w-full border-2 border-dashed border-[var(--gray)] rounded-lg py-10 flex flex-col items-center justify-center text-sm cursor-pointer text-[var(--sub)]"
        >
          <div className="flex bg-[var(--main2)] rounded px-4 gap-1 py-2">
            <img src="/upload.svg" className="w-4 h-4" alt="uplaod" />
            <p className="text-white text-xs">파일 선택</p>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setUploadForm((prev) => ({
                ...prev,
                image: e.target.files?.[0]
                  ? URL.createObjectURL(e.target.files[0])
                  : "",
              }))
            }
            className="hidden"
          />
        </label>
      </div>
      <button
        className="w-full flex items-center justify-center bg-[var(--main2)] text-white text-sm font-semibold rounded py-4 cursor-pointer"
        onClick={handleUpload}
      >
        작성완료
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50">
          <Modal
            title="작성 완료"
            content="등록이 성공적으로 완료되었습니다."
            buttonText="확인"
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
