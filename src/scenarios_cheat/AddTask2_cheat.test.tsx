import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { TaskJson } from '../Tasks/Tasks.types';
import { AddTask, addTaskTestId } from '../Tasks/AddTask';
import { AppControls, testApp } from '../App/App_t';

const user = { name: 'employee', isBoss: false };

test('As a user I want to add tasks so I can plan my work', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [user]);
  mock.onGet('/api/tasks').reply(200, []);
  mock.onPost('/api/tasks').reply(200, []);

  await testApp(async (app: AppControls) => {
    step('User logs in');
    app.login.userSelect.selectUser(user.name);
    app.login.userSelect.clickSelect();
    await app.openTasks.waitUntilDataLoaded();

    step('User adds task');
    app.addTask.inputTaskName('work more');
    app.addTask.clickAdd();
    await app.openTasks.waitUntilDataLoaded();
  });

  const postedTask: TaskJson = JSON.parse(mock.history.post[0].data);
  expect(postedTask.assignee).toEqual(user.name);
  expect(postedTask.description).toEqual('work more');
});
