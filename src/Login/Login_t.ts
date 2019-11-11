import { RenderResult } from '@testing-library/react';
import { userSelect_t, UserSelect_t } from './UserSelect_t';

export type Login_t = {
  waitUntilDataLoaded: () => Promise<void>;
  userSelect: UserSelect_t;
  checkLoggedInAs: (name: string) => void;
};

export const login_t = (r: RenderResult): Login_t => ({
  waitUntilDataLoaded: async () => {
    await r.findByText('Log in');
    await userSelect_t(r).waitUntilLoaded();
  },
  userSelect: userSelect_t(r),
  checkLoggedInAs: name => r.getByText(`Logged in as ${name}`),
});
