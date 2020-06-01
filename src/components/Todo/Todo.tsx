import React from 'react';
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
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IModel } from './TodoModel';
import { updateTodoStatus, deleteTodo } from '../../store/actions/todos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    card: {
      maxWidth: 575,
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
    spaceAround: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    flexEnd: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }),
);

export const Todo: React.FC<IModel> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleTodoComplete = (id: number) => {
    dispatch(updateTodoStatus(id));
  }

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  }

  return (
    <Card raised={true} className={`${classes.card} ${props.todo.completed ? classes.completed : classes.notCompleted}`}>
      <Grid container spacing={2}>
        <Grid item xs={1} className={classes.flexEnd}>
          <Checkbox
            checked={props.todo.completed}
            onChange={() => handleTodoComplete(props.todo.id)}
            color="primary"
            size="medium"
            inputProps={{ 'aria-label': 'secondary checkbox' }} />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h6">{props.todo.title}</Typography>

          <div className={classes.flex}>
            <Typography>Исполнитель: </Typography>
            <Link to={`/user/${props?.executor?.id}`} className={`${classes.linkStyles} ${classes.marginLeft}`}>
              <Typography>{props.executor.name}</Typography>
            </Link>
          </div>
        </Grid>

        <Grid item xs={3} className={classes.flexEnd}>
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button
              color="primary"
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
        </Grid>
      </Grid>
    </Card>
  );
}
