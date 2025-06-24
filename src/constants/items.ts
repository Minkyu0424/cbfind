import type { FilterOption } from "../types/items";

export const MockOptions: FilterOption[] = [
  { label: "최신순", value: "latest" },
  { label: "조회순", value: "views" },
  { label: "오래된순", value: "oldest" },
];

export const InitUploadFormData = {
  title: "",
  content: "",
  image: "",
  place: "",
  date: new Date().toISOString(),
};

export const InitSignUpFormData = {
  name: "",
  studentId: "",
  password: "",
  email: "",
  agreedToPolicy: false,
};
