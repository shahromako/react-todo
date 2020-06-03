import { Reducer } from "react";
import { Action } from "redux";

import { ActionTypes } from "../actions";
import { IUserState } from "../../shared/models/user";

export const initialState: IUserState = {
  items: [],
  loading: false,
  error: null,
}

export const userReducer: Reducer<IUserState, Action | any> = (
  state = initialState,
  action,
): IUserState => {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return { ...state, loading: true };
    case ActionTypes.GET_USERS_SUCCESS:
      return { ...state, items: action.payload, loading: false };
    case ActionTypes.GET_USERS_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
