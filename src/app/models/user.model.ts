
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface ArticleComment {
  id?: string;
  text: string;

  userId: string;
  userName: string;
  userPhoto?: string | null;

  createdAt: any;
}