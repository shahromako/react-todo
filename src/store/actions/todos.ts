import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { Action } from 'redux';

import { ActionTypes, ThunkResult } from '.';
import { ITodo } from '../../shared/models/todos';
import { env } from '../../shared/environment/environment';

const handleGetTodos = (dispatch: Dispatch<Action | any>) => {
  dispatch({
    type: ActionTypes.GET_TODOS,
  });
}

const handleGetTodosSuccess = (dispatch: Dispatch<Action | any>, response: ITodo[]) => {
  dispatch({
    type: ActionTypes.GET_TODOS_SUCCESS,
    payload: response,
  });
}

const handleGetTodosError = (dispatch: Dispatch<Action | any>, error: AxiosError | any) => {
  dispatch({
    type: ActionTypes.GET_TODOS_ERROR,
    payload: error,
  });
}

export const getTodos = (): ThunkResult<void> => async dispatch => {
  handleGetTodos(dispatch);

  try {
    const response: AxiosResponse<ITodo[]> = await axios({
      method: 'GET',
      url: `${env.url}/todos`
    });

    handleGetTodosSuccess(dispatch, response.data);
  } catch (error) {
    handleGetTodosError(dispatch, error);
  }
}

export const updateTodo = (id: number, title: string) => {
  return {
    type: ActionTypes.UPDATE_TODO,
    payload: { id: id, title: title },
  };
}

export const updateTodoStatus = (id: number) => {
  return {
    type: ActionTypes.UPDATE_TODO_STATUS,
    payload: { id },
  };
}

export const deleteTodo = (id: number) => {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: { id },
  };
}

export const searchTodo = (title: string) => {
  return {
    type: ActionTypes.SEARCH_TODO,
    payload: { title },
  };
}