import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { TaskJson } from '../Tasks/Tasks.types';
import * as assert from 'assert';
import { AppControls, testApp } from '../App/App_t';

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
  mock.onGet('/api/tasks').reply(200, [task]);
  mock.onPut(`/api/tasks/${task.id}/complete`).reply(200);

  await testApp(async (app: AppControls) => {
    await app.login.waitUntilDataLoaded();

    step('User logs in');
    app.login.userSelect.selectUser(user.name);
    app.login.userSelect.clickSelect();
    await app.openTasks.waitUntilDataLoaded();

    step('User completes task');
    app.openTasks.row(0).clickDone();
    await app.openTasks.waitUntilDataLoaded();
  });

  expect(mock.history.put[0].url).toEqual(`/api/tasks/${task.id}/complete`);
});
