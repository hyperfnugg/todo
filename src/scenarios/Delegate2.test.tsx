import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';
import { AppControls, testApp } from '../App/App_t';
import {TaskJson} from "../Tasks/Tasks.types";

test('As a boss I want add task to a employees todo list', async () => {
  const bossuser = { name: 'bossuser', isBoss: true };
  const subordinate = { name: 'employee', isBoss: false };

  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [bossuser, subordinate]);
  mock.onGet('/api/tasks').reply(200, []);
  mock.onPost('/api/tasks').reply(200, []);

  await testApp(async (app: AppControls) => {
    await app.login.waitUntilDataLoaded();
    step('boss logs in in the login page');
    app.login.userSelect.selectUser('bossuser');
    app.login.userSelect.clickSelect();
    app.login.checkLoggedInAs('bossuser');


    step('boss selects view tasks for employee');
    await app.taskOfOthersSelector.waitUntilDataLoaded();
    app.taskOfOthersSelector.clickExpand();
    app.taskOfOthersSelector.userSelect.selectUser('employee');
    app.taskOfOthersSelector.userSelect.clickSelect();
    app.taskOfOthersSelector.userSelect.checkViewingTasksOf();

    step('boss adds task to employee');
    app.addTask.inputTaskName('New task');
    app.addTask.clickAdd();
    await app.openTasks.waitUntilDataLoaded()
    const postedTask: TaskJson = JSON.parse(mock.history.post[0].data);
    expect(postedTask.assignee).toEqual('employee');
    expect(postedTask.description).toEqual('New task');
  });
});
