import { useState } from "react";
import UploadForm from "./UploadForm";
import UploadHeader from "./UploadHeader";

const UploadContainer = () => {
  const [isFound, setIsFound] = useState(false);
  return (
    <div className="flex flex-col size-full gap-6 pt-5 px-2.5">
      <UploadHeader isFound={isFound} setIsFound={setIsFound} />
      <UploadForm isFound={isFound} />
    </div>
  );
};

export default UploadContainer;
