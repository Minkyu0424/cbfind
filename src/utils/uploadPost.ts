// src/utils/uploadPost.ts
import { db } from "../firebase/setFirebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import type { UploadFormTypes } from "../types/common";

export const uploadPostToFirestore = async (
  data: UploadFormTypes,
  isFound: boolean
) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...data,
      type: isFound ? "found" : "lost",  // ✅ 이 필드로 구분
      status: "open",
      timestamp: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Firestore 저장 실패:", error);
    throw error;
  }
};
                        