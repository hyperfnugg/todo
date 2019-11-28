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
    .fakeBackend();

  await testApp(async (app: AppControls) => {

    step('User logs in');

    step('User completes task');
  });

  expect(data.mock.history.put[0].url).toEqual(`/api/tasks/${taskId}/complete`);
});
