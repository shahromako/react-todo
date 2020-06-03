import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { IRootState } from '../../store/store';
import { ITodosState, ITodo } from '../../shared/models/todos';
import { Todo } from '../../components/Todo/Todo';
import { getExecutor } from '../../shared/utils/utils';
import { IUserState } from '../../shared/models/user';

const User = (props: any) => {
  const [userTodos, setUserTodos] = useState<ITodo[]>([]);

  const todos = useSelector<IRootState, ITodosState>(
    state => state.todos,
  );

  const users = useSelector<IRootState, IUserState>(
    state => state.user,
  );

  useEffect(() => {
    if (todos.items && todos.items.length > 0) {
      let items = todos.items.filter(item => {
        return item.userId === Number(props.match.params.id);
      });

      setUserTodos(items);
      document.title = `TODO: ${items.length}`
    }
  }, [props.match.params.id, todos.items]);

  const todoList = userTodos && userTodos.length > 0 ?
    userTodos.map((todo, index) =>
      <Todo
        todo={todo}
        executor={getExecutor(todo.userId, users.items)}
        index={index}
        key={index}
      />
    ) : <></>

  return (
    <div>
      <Container maxWidth="md">
        {todoList}
      </Container>
    </div>
  );
}

export default User;
