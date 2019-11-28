import { UserData } from './UserData';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { UserJson } from '../Login/Login.types';
import { TaskJson } from '../Tasks/Tasks.types';
import { TaskData } from './TaskData';

type AppJson = {
  users: UserData[];
};

type Runtime = {
  users: UserJson[];
  tasks: TaskJson[];
  mock: MockAdapter;
};

export class AppData {
  readonly t: AppJson;

  constructor(t: AppJson = { users: [] }) {
    this.t = t;
  }

  private med = (obj: Partial<AppJson>) => {
    return new AppData({
      ...this.t,
      ...obj,
    });
  };

  add = (user: UserData) => this.med({ users: [...this.t.users, user] });

  fakeBackend = (): Runtime => {
    let users: UserJson[] = [];
    let tasks: TaskJson[] = [];

    this.t.users.forEach((user: UserData) => {
      const userJson = user.toJson();
      users = [...users, userJson];
      user.m.tasks.forEach((task: TaskData) => {
        tasks = [...tasks, task.assignee(userJson.name).toJson()];
      });
    });

    const mock = new MockAdapter(axios);
    mock.onGet('/api/users').reply(200, users);
    mock.onGet('/api/tasks').reply(200, tasks);
    mock.onPost('/api/tasks').reply(200, []);
    tasks.forEach(task => {
      mock.onPut(`/api/tasks/${task.id}/complete`).reply(200);
      mock.onPut(`/api/tasks/${task.id}/reset`).reply(200);
    });
    return {
      tasks,
      users,
      mock,
    };
  };
}

export const appData = new AppData();
