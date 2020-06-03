import React, { useState } from 'react';
import {
  Card,
  Theme,
  createStyles,
  makeStyles,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { IUserState } from '../../shared/models/user';
import { addTodo } from '../../store/actions/todos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 675,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      transition: '0.3s',
    },
    formControl: {
      width: '100%'
    },
    flexEnd: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    }
  }),
);

export const AddTodo: React.FC = () => {
  const [userID, setUserID] = useState<string>('');
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [inputValid, setInputValid] = useState<boolean>(true);
  const [selectValid, setSelectValid] = useState<boolean>(true);

  const classes = useStyles();
  const dispatch = useDispatch();

  const users = useSelector<IRootState, IUserState>(
    state => state.user,
  );

  const usersOptions = users.items && users.items.map((user, index) => (
    <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
  ));

  const handleFormSubmit = () => {
    if (todoTitle && userID) {
      dispatch(addTodo(Number(userID), todoTitle));
      setTodoTitle('');
      setUserID('');
    }
  }

  const handleChangeInput = (text: string) => {
    setTodoTitle(text);
    setInputValid(text.length > 0);
  }

  return (
    <Card raised={true} className={classes.card}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-label">Исполнители</InputLabel>
              <Select
                labelId="select-label"
                id="userSelect"
                name="user"
                error={!selectValid}
                value={userID}
                onChange={(e: any) => setUserID(e.target.value)}
                onBlur={() => { userID ? setSelectValid(true) : setSelectValid(false) }}
                fullWidth>
                {usersOptions}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={7}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-label">Название таска</InputLabel>
              <Input
                id="todo-title"
                multiline
                error={!inputValid}
                onChange={(e: any) => handleChangeInput(e.target.value)}
                onBlur={() => { todoTitle ? setInputValid(true) : setInputValid(false) }}
                value={todoTitle}
                placeholder="Название таска"
              />
            </FormControl>
          </Grid>

          <Grid item sm={2} className={classes.flexEnd}>
            <Button color="primary" onClick={() => handleFormSubmit()}>Добавить</Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
