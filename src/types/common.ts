export interface ItemTypes {
  id?: string;
  title: string;
  content: string;
  image: string;
  place: string;
  date: string;
  user: UserTypes;
  views: number;
  chatCount: number;
  type: string;
}

export type UserTypes = {
  id: number;
  name: string;
  profileImage: string;
};

export interface UploadFormTypes {
  title: string;
  content: string;
  image: string | File;
  place: string;
  date: string;
}

export interface SignUpFormTypes {
  name: string;
  studentId: string;
  password: string;
}

export interface CommentTypes {
  commentId: number;
  content: string;
  createdAt: string;
}
