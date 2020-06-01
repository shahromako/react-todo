import { AxiosError } from 'axios';

export interface ITodosState {
  items: ITodo[],
  loading: boolean,
  error: AxiosError | any;
}

export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
