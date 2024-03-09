export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface DataState {
  data: UserData[] | null;
  loading: boolean;
  error: string | null;
}
