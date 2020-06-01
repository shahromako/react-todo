import { combineReducers } from "redux"

// import { IRootState } from "../store";
import { todosReducer } from "./todos";
import { userReducer } from "./user";

export const rootReducer =
  combineReducers<any>({
    todos: todosReducer,
    user: userReducer,
  });
