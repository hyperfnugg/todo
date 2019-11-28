import { UserData } from './UserData';

type AppJson = {
  users: UserData[];
};

export class AppData {
  readonly t: AppJson;

  constructor(t:AppJson = { users: [] }) {
    this.t = t;
  }

  private med = (obj: Partial<AppJson>) => {
    return new AppData({
      ...this.t,
      ...obj,
    });
  };

  add = (user: UserData) => this.med({ users: [...this.t.users, user] });
}

export const appData = new AppData();
