// src/utils/uploadImage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToStorage = async (file: File) => {
  const storage = getStorage();
  const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const downloadUrl = await getDownloadURL(fileRef);
  return downloadUrl;
};
