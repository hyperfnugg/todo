import { fireEvent, RenderResult } from '@testing-library/react';
import { userSelect_t, UserSelect_t } from '../Login/UserSelect_t';

export type AddTask_t = {
  inputTaskName: (name:string) => void;
  clickAdd: () => void
};

export const addTask = (
  r: RenderResult,
): AddTask_t => ({
  inputTaskName: (name) => {
    fireEvent.input(r.getByTestId('add-task-input'), {
      target: { value: name },
    });
  },
  clickAdd: () => {
    fireEvent.click(r.getByText('add'));
  },
});
