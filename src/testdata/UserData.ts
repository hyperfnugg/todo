import { UserJson } from '../Login/Login.types';
import { TaskData } from './TaskData';

type UserMeta = {
  tasks: TaskData[];
};

export class UserData {
  private t: Partial<UserJson>;
  private m: UserMeta = {
    tasks: [],
  };

  constructor(t = {}, m = { tasks: [] }) {
    this.t = t;
    this.m = m;
  }

  with = (newData : Partial<UserJson>) => new UserData()

  name = name => return
}

export const user = new UserData();
