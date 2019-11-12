import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { TaskJson } from '../Tasks/Tasks.types';
import { AddTask, addTaskTestId } from '../Tasks/AddTask';

const user = { name: 'employee', isBoss: false };

test('As a user I want to add tasks so I can plan my work', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [user]);
  mock.onGet('/api/tasks').reply(200, []);
  mock.onPost('/api/tasks').reply(200, []);

  const r = render(<App />);


  step('User logs in');
  await r.findByText('Log in');
  fireEvent.click(r.getByText(user.name));
  fireEvent.click(r.getByText('Select'));
  await r.findByText('To do');

  step('User adds task');
  fireEvent.input(r.getByTestId(addTaskTestId), {
    target: { value: 'work more' },
  });
  fireEvent.click(r.getByText('add'));
  await r.findByText('To do');

  const postedTask: TaskJson = JSON.parse(mock.history.post[0].data);
  expect(postedTask.assignee).toEqual(user.name);
  expect(postedTask.description).toEqual('work more');
});
