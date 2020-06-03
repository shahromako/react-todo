import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { IRootState } from '../../store/store';
import { ITodosState } from '../../shared/models/todos';
import { getTodos } from '../../store/actions/todos';
import { IUserState } from '../../shared/models/user';
import { getUsers } from '../../store/actions/user';
import { Todo } from '../../components/Todo/Todo';
import { getExecutor } from '../../shared/utils/utils';
import { AddTodo } from '../../components/AddTodo/AddTodo';

const Todos: React.FC = () => {
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

  const todoList = todos.items && todos.items.length > 0 ?
    todos.items.map((todo, index) =>
      <Todo
        todo={todo}
        executor={getExecutor(todo.userId, users.items)}
        index={index}
        key={index}
      />
    ) : <></>

  return (
    <Container maxWidth="md">
      <AddTodo />
      {todoList}
    </Container>
  );
}

export default Todos;
