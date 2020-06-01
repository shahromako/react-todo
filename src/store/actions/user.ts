import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { Action } from 'redux';

import { ActionTypes, ThunkResult } from '.';
import { env } from '../../shared/environment/environment';
import { IUser } from '../../shared/models/user';

export const handleGetUsers = (dispatch: Dispatch<Action | any>) => {
  dispatch({
    type: ActionTypes.GET_USERS,
  });
}

export const handleGetUsersSuccess = (dispatch: Dispatch<Action | any>, response: IUser[]) => {
  dispatch({
    type: ActionTypes.GET_USERS_SUCCESS,
    payload: response,
  });
}

export const handleGetUsersError = (dispatch: Dispatch<Action | any>, error: AxiosError | any) => {
  dispatch({
    type: ActionTypes.GET_USERS_ERROR,
    payload: error,
  });
}

export const getUsers = (): ThunkResult<void> => async dispatch => {
  handleGetUsers(dispatch);

  try {
    const response: AxiosResponse<IUser[]> = await axios({
      method: 'GET',
      url: `${env.url}/users`
    });

    handleGetUsersSuccess(dispatch, response.data);
  } catch (error) {
    handleGetUsersError(dispatch, error);
  }
}
