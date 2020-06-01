import { ITodo } from "../../shared/models/todos";
import { ISelectedUser } from "../../shared/models/user";

export interface IModel {
  todo: ITodo;
  executor: ISelectedUser;
}
