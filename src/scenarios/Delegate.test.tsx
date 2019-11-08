import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { TaskJson } from '../Tasks/Tasks.types';

test('As a boss I want add task to a employees todo list', async () => {
  const bossuser = { name: 'bossuser', isBoss: true };
  const subordinate = { name: 'employee', isBoss: false };

  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [bossuser, subordinate]);
  mock.onGet('/api/tasks').reply(200, []);
  mock.onPost('/api/tasks').reply(200, []);

  const {
    findByText,
    getByText,
    getByTestId,
  } = render(<App />);

  step('boss logs in in the login page');
  await findByText('Log in');
  fireEvent.click(getByText('bossuser'));
  fireEvent.click(getByText('Select'));
  await findByText('Logged in as bossuser');
  await findByText('You can view and edit tasks for others');

  step('boss selects view tasks for employee');
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('employee'));
  fireEvent.click(getByText('Select'));
  await findByText('You are viewing the tasks of', { exact: false });

  step('boss adds task');
  fireEvent.change(getByTestId('add-task-input'), {
    target: { value: 'New task' },
  });
  fireEvent.click(getByText('add'));
  await findByText('To do');
  const postedTask: TaskJson = JSON.parse(mock.history.post[0].data);
  expect(postedTask.assignee).toEqual('employee');
  expect(postedTask.description).toEqual('New task');
});
