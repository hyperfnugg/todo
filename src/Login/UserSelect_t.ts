import { fireEvent, RenderResult } from '@testing-library/react';

export type UserSelect_t = {
  waitUntilLoaded: () => Promise<void>;
  selectUser: (name: string) => void;
  clickSelect: () => void;
  checkViewingTasksOf: () => void;
};

export const userSelect_t = (r: RenderResult): UserSelect_t => ({
  waitUntilLoaded: async () => {
    await r.findByText('Log in');
  },
  selectUser: (name: string) => {
    fireEvent.click(r.getByText(name));
  },
  checkViewingTasksOf: () => {
    r.getByText(`You are viewing the tasks of`, {exact:false});
  },
  clickSelect: () => {
    fireEvent.click(r.getByText('Select'));
  },
});
