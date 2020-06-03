import { Reducer } from "react";
import { Action } from "redux";

import { ITodosState, ITodo } from "../../shared/models/todos";
import { ActionTypes } from "../actions";

export const initialState: ITodosState = {
  items: [],
  oldState: [],
  loading: false,
  error: null,
}

export const todosReducer: Reducer<ITodosState, Action | any> = (
  state = initialState,
  action,
): ITodosState => {
  switch (action.type) {
    case ActionTypes.GET_TODOS:
      return { ...state, loading: true };
    case ActionTypes.GET_TODOS_SUCCESS:
      return { ...state, items: action.payload, oldState: action.payload, loading: false };
    case ActionTypes.GET_TODOS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.UPDATE_TODO:
      if (state.items && state.items.length > 0) {
        const length: number = state.items.length;
        for (let i = 0; i < length - 1; i++) {
          if (state.items[i].id === action.payload.id) {
            state.items[i].title = action.payload.title;
          }
        }
      }
      return { ...state, items: state.items };
    case ActionTypes.UPDATE_TODO_STATUS:
      if (state.items && state.items.length > 0) {
        const length: number = state.items.length;

        for (let i = 0; i < length - 1; i++) {
          if (state.items[i].id === action.payload.id) {
            state.items[i].completed = !state.items[i].completed;
          }
        }
      }
      return { ...state, items: state.items };
    case ActionTypes.DELETE_TODO:
      if (state.items && state.items.length > 0) {
        const length: number = state.items.length;
        for (let i = 0; i < length - 1; i++) {
          if (state.items[i].id === action.payload.id) {
            state.items.splice(i, 1);
          }
        }
      }
      return { ...state, items: state.items };
    case ActionTypes.SEARCH_TODO:
      let items = state.oldState.filter(item => {
        return item.title.search(action.payload.title.toLowerCase()) !== -1;
      });
      return { ...state, items: items };
    case ActionTypes.ADD_TODO:
      const todo: ITodo = {
        id: state.items.length * 2 + 1,
        userId: action.payload.userId,
        title: action.payload.title,
        completed: false,
      }
      return { ...state, items: [todo, ...state.items] };
    default:
      return state;
  }
}
