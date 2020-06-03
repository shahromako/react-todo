import { ISelectedUser, IUser } from "../models/user";

export const getExecutor = (id: number, usersArr: IUser[]): ISelectedUser => {
  const usersLength: number = usersArr.length;
  let executor: ISelectedUser = {
    id: -1,
    name: 'no executor found',
  };

  if (usersArr && usersLength) {
    for (let i = 0; i < usersLength; i++) {
      if (usersArr[i].id === id) {
        executor.id = usersArr[i].id;
        executor.name = usersArr[i].name;
        return executor;
      }
    }
  }

  return executor;
}
