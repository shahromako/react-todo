import React, { useState } from 'react';
import {
  Card,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Checkbox,
  FormControl,
  Input,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IModel } from './TodoModel';
import { updateTodoStatus, deleteTodo, updateTodo } from '../../store/actions/todos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 675,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      transition: '0.3s',
    },
    completed: {
      '& h6': {
        textDecoration: 'line-through',
      },
      opacity: '0.5',
    },
    notCompleted: {
      backgroundColor: '#ffffff',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    linkStyles: {
      textDecoration: 'none',
    },
    marginLeft: {
      marginLeft: '5px',
    },
    flexEnd: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    fullWidth: {
      width: '100%',
    },
  }),
);

export const Todo: React.FC<IModel> = (props) => {
  const [rowID, setRowID] = useState<number>(-1);
  const [todoTitle, setTodoTitle] = useState<string>('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleTodoComplete = (id: number) => {
    dispatch(updateTodoStatus(id));
  }

  const handleDeleteTodo = (id: number) => {
    /* eslint-disable */
    const conf = confirm('Вы уверены? Todo будет удален!');

    if (conf) {
      dispatch(deleteTodo(id));
    }
  }

  const handleChangeInput = (text: string) => {
    setTodoTitle(text);
  }

  const handleUpdateTodo = (id: number) => {
    if (todoTitle) {
      dispatch(updateTodo(id, todoTitle));
      setRowID(-1);
    }
  }

  const showInput = (index: number, title: string) => {
    setRowID(index);
    setTodoTitle(title);
  }

  return (
    <Card raised={true} className={`${classes.card} ${props.todo.completed ? classes.completed : classes.notCompleted}`}>
      <Grid container spacing={2}>
        <Grid item lg={1} md={1} sm={2} className={classes.flexEnd}>
          <Checkbox
            checked={props.todo.completed}
            onChange={() => handleTodoComplete(props.todo.id)}
            color="primary"
            size="medium"
            inputProps={{ 'aria-label': 'secondary checkbox' }} />
        </Grid>

        <Grid item lg={8} md={8} sm={10}>
          {
            rowID === props.index ? (
              <FormControl className={classes.fullWidth}>
                <Input
                  id={`${props.todo.id}`}
                  multiline
                  autoFocus
                  error={!todoTitle}
                  onChange={(e) => handleChangeInput(e.target.value)}
                  value={todoTitle}
                  placeholder="Название таска"
                  aria-describedby={`err-text-${props.todo.id}`}
                />
              </FormControl>
            ) : (
                <Typography variant="h6">{props.todo.title}</Typography>
              )
          }

          <div className={classes.flex}>
            <Typography>Исполнитель: </Typography>
            <Link to={`/user/${props?.executor?.id}`} className={`${classes.linkStyles} ${classes.marginLeft}`}>
              <Typography>{props.executor.name}</Typography>
            </Link>
          </div>
        </Grid>

        <Grid item lg={3} md={3} sm={12} className={classes.flexEnd}>
          {
            rowID === props.index ? (
              <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button
                  color="default"
                  onClick={() => setRowID(-1)}
                  disabled={props.todo.completed}
                >
                  cancel
                </Button>

                <Button
                  color="primary"
                  onClick={() => handleUpdateTodo(props.todo.id)}
                >
                  save
                </Button>
              </ButtonGroup>
            ) : (
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                  <Button
                    color="primary"
                    onClick={() => showInput(props.index, props.todo.title)}
                    disabled={props.todo.completed}
                  >
                    edit
                  </Button>

                  <Button
                    color="secondary"
                    onClick={() => handleDeleteTodo(props.todo.id)}
                  >
                    delete
                  </Button>
                </ButtonGroup>
              )
          }
        </Grid>
      </Grid>

    </Card>
  );
}
