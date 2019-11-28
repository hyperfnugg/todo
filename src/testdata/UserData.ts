import { UserJson } from '../Login/Login.types';
import { TaskData } from './TaskData';
import faker from 'faker';

type UserMeta = {
  tasks: TaskData[];
};

export class UserData {
  private t: Partial<UserJson>;
  m: UserMeta = {
    tasks: [],
  };

  constructor(t = {}, m: UserMeta = { tasks: [] }) {
    this.t = t;
    this.m = m;
  }

  private with = (newData: Partial<UserJson>) =>
    new UserData({ ...this.t, ...newData }, this.m);

  private withMeta = (newMeta: Partial<UserMeta>) =>
    new UserData(this.t, { ...this.m, ...newMeta });

  name = (name: string) => this.with({ name });

  isBoss = (isBoss: boolean) => this.with({ isBoss });

  add = (task: TaskData) => this.withMeta({ tasks: [...this.m.tasks, task] });

  toJson = (): UserJson => ({
    name: this.t.name || faker.name.findName(),
    isBoss: !!this.t.isBoss,
  });
}

export const user = new UserData();
