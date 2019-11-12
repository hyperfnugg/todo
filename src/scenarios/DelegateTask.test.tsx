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

  const r = render(<App />);
  step('boss logs in');

  step('boss selects view tasks for employee');

  step('boss adds task to employee');
  const postedTask: TaskJson = JSON.parse(mock.history.post[0].data);
  expect(postedTask.assignee).toEqual('employee');
  expect(postedTask.description).toEqual('New task');
});
