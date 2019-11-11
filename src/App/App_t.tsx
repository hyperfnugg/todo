import React from 'react';
import './App.css';
import {render, RenderResult} from '@testing-library/react';
import App from './App';
import { login_t, Login_t } from '../Login/Login_t';
import {
  taskOfOthersSelector,
  TaskOfOthersSelector_t,
} from '../Tasks/TaskOfOthersSelector_t';

export type AppControls = {
  login: Login_t;
  taskOfOthersSelector: TaskOfOthersSelector_t;
  r: RenderResult
};

export const testApp = async (
  testScript: (app: AppControls) => Promise<void>,
): Promise<void> => {
  const r = render(<App />);
  const app: AppControls = {
    login: login_t(r),
    taskOfOthersSelector: taskOfOthersSelector(r),
    r
  };
  await app.login.waitUntilDataLoaded();
  await testScript(app);
};
