import { createStore, applyMiddleware, Action } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ITodosState } from "../shared/models/todos";
import { IUserState } from "../shared/models/user";
import { rootReducer } from './reducers';

export interface IRootState {
  readonly todos: ITodosState;
  readonly user: IUserState;
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      reduxThunk as ThunkMiddleware<IRootState, Action | any>,
    ),
  ),
);
