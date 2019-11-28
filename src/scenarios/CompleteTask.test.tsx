import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { TaskJson } from '../Tasks/Tasks.types';
import * as assert from 'assert';

test('As a user I want to finish a task so I can sleep', async () => {
  const user = { name: 'employee', isBoss: false };
  let task = {
    id: '111',
    description: 'work more',
    assignee: user.name,
    completed: false,
  };

  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [user]);
  mock.onGet('/api/tasks').reply(200, [task]);
  mock.onPut(`/api/tasks/${task.id}/complete`).reply(200);

  const r = render(<App />);


  step('User logs in');


  step('User completes task');

  expect(mock.history.put[0].url).toEqual(`/api/tasks/${task.id}/complete`);
});
