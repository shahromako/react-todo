import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { IRootState } from '../../store/store';
import { ITodosState } from '../../shared/models/todos';
import { getTodos } from '../../store/actions/todos';
import { IUserState, ISelectedUser } from '../../shared/models/user';
import { getUsers } from '../../store/actions/user';
import { Todo } from '../../components/Todo/Todo';

const Todos = () => {
  const todos = useSelector<IRootState, ITodosState>(
    state => state.todos,
  );

  const users = useSelector<IRootState, IUserState>(
    state => state.user,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
    dispatch(getUsers());
  }, [dispatch]);

  const getExecutor = (id: number): ISelectedUser => {
    const usersLength: number = users.items.length;
    let executor: ISelectedUser = {
      id: -1,
      name: 'no executor found',
    };

    if (users.items && usersLength) {
      for (let i = 0; i < usersLength; i++) {
        if (users.items[i].id === id) {
          executor.id = users.items[i].id;
          executor.name = users.items[i].name;
          return executor;
        }
      }
    }

    return executor;
  }

  const todoList = todos.items && todos.items.length > 0 ?
    todos.items.map((todo, index) =>
      <Todo todo={todo} executor={getExecutor(todo.userId)} key={index} />
    ) : <></>

  return (
    <div className="Todos">
      <Container maxWidth="md">
        {todoList}
      </Container>
    </div>
  );
}

export default Todos;
