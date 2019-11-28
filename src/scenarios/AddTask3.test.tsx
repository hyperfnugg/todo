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
import {appData} from "../testdata/AppData";
import {user} from "../testdata/UserData";

const employee = user.{ name: 'employee', isBoss: false };

test('As a employee I want to add tasks so I can plan my work', async () => {
  appData.add()
  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [employee]);
  mock.onGet('/api/tasks').reply(200, []);
  mock.onPost('/api/tasks').reply(200, []);

  await testApp(async (app: AppControls) => {
    step('User logs in');

    step('User adds task');
  });

  const postedTask: TaskJson = JSON.parse(mock.history.post[0].data);
  expect(postedTask.assignee).toEqual(employee.name);
  expect(postedTask.description).toEqual('work more');
});
