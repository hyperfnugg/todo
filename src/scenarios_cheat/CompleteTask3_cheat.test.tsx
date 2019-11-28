import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { step } from '../test/step';
import { AppControls, testApp } from '../App/App_t';
import { appData } from '../testdata/AppData';
import { user } from '../testdata/UserData';
import { task } from '../testdata/TaskData';

test('As a user I want to finish a task so I can sleep', async () => {
  const employeeName = 'employee';
  const taskId = '111';

  const data = appData
    .add(
      user
        .name(employeeName)
        .isBoss(false)
        .add(task.id(taskId)),
    )
    .fakeBackend();

  await testApp(async (app: AppControls) => {
    await app.login.waitUntilDataLoaded();

    step('User logs in');
    app.login.userSelect.selectUser(employeeName);
    app.login.userSelect.clickSelect();
    await app.openTasks.waitUntilDataLoaded();

    step('User completes task');
    app.openTasks.row(0).clickDone();
    await app.openTasks.waitUntilDataLoaded();
  });

  expect(data.mock.history.put[0].url).toEqual(`/api/tasks/${taskId}/complete`);
});
