export interface ItemTypes {
  id: number;
  title: string;
  content: string;
  image: string;
  place: string;
  date: string;
  user: UserTypes;
  views: number;
  chatCount: number;
}

type UserTypes = {
  id: number;
  name: string;
  profileImage: string;
};
