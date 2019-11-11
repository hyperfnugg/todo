import { fireEvent, RenderResult } from '@testing-library/react';
import { userSelect_t, UserSelect_t } from '../Login/UserSelect_t';

export type TaskOfOthersSelector_t = {
  waitUntilDataLoaded: () => Promise<void>;
  clickExpand: () => void;
  userSelect: UserSelect_t;
};

export const taskOfOthersSelector = (
  r: RenderResult,
): TaskOfOthersSelector_t => ({
  waitUntilDataLoaded: async () => {
    await r.findByText('You can view and edit tasks for others');
  },
  clickExpand: () => {
    fireEvent.click(r.getByText('+'));
  },
  userSelect: userSelect_t(r),
});
