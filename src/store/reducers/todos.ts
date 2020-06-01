import { Reducer } from "react";
import { Action } from "redux";

import { ITodosState } from "../../shared/models/todos";
import { ActionTypes } from "../actions";

export const initialState: ITodosState = {
  items: [],
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
      return { ...state, items: action.payload, loading: false };
    case ActionTypes.GET_TODOS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.UPDATE_TODO:
      if (state.items && state.items.length > 0) {
        const length: number = state.items.length;
        for (let i = 0; i < length; i++) {
          if (state.items[i].id === action.payload.id) {
            state.items[i].title = action.payload.title;
          }
        }
      }
      return { ...state, items: state.items };
    case ActionTypes.UPDATE_TODO_STATUS:
      if (state.items && state.items.length > 0) {
        const length: number = state.items.length;

        for (let i = 0; i < length; i++) {
          if (state.items[i].id === action.payload.id) {
            state.items[i].completed = !state.items[i].completed;
          }
        }
      }
      return { ...state, items: state.items };
    case ActionTypes.DELETE_TODO:
      if (state.items && state.items.length > 0) {
        const length: number = state.items.length;
        for (let i = 0; i < length; i++) {
          if (state.items[i].id === action.payload.id) {
            state.items.splice(i, 1);
            return state;
          }
        }
      }
      return { ...state, items: state.items };
    case ActionTypes.SEARCH_TODO:
      let items = state.items.filter(item => {
        return item.title.search(action.payload.title.toLowerCase()) !== -1;
      });
      return { ...state, items: items };
    default:
      return state;
  }
}
