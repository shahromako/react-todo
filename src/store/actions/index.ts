import { ThunkAction } from "redux-thunk";
import { IRootState } from "../store";

export enum ActionTypes {
  // todos action types
  GET_TODOS = 'GET_TODOS',
  GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS',
  GET_TODOS_ERROR = 'GET_TODOS_ERROR',
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS',
  SEARCH_TODO = 'SEARCH_TODO',

  // user action types
  GET_USERS = 'GET_USERS',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
  GET_USER_TODOS = 'GET_USER_TODOS',
}


export type ThunkResult<R> = ThunkAction<R, IRootState, undefined, any>;
