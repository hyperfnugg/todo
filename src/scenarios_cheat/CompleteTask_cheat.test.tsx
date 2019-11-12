import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { TaskJson } from '../Tasks/Tasks.types';
import * as assert from "assert";

test('As a user I want to finish a task so I can sleep', async () => {
  const user = { name: 'employee', isBoss: false };

  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [user]);
  let task = {
    id: '111',
    description: 'work more',
    assignee: user.name,
    completed: false,
  };
  mock
    .onGet('/api/tasks')
    .reply(200, [task,]);
  mock.onPut(`/api/tasks/${task.id}/complete`).reply(200);

  const r = render(<App />);


  step('User logs in');
  await r.findByText('Log in');
  fireEvent.click(r.getByText(user.name));
  fireEvent.click(r.getByText('Select'));
  await r.findByText('To do');


  step('User completes task');
  fireEvent.click(r.getByText('Done!'));
  await r.findByText('To do');

  expect(mock.history.put[0].url).toEqual(`/api/tasks/${task.id}/complete`);
});
