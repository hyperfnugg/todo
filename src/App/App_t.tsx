import React from 'react';
import './App.css';
import {render, RenderResult} from '@testing-library/react';
import App from './App';
import { login_t, Login_t } from '../Login/Login_t';
import {
  taskOfOthersSelector,
  TaskOfOthersSelector_t,
} from '../Tasks/TaskOfOthersSelector_t';
import {addTask, AddTask_t} from "../Tasks/AddTask_t";
import {openTasks_t, OpenTasks_t} from "../Tasks/OpenTasks_t";

export type AppControls = {
  login: Login_t;
  taskOfOthersSelector: TaskOfOthersSelector_t;
  addTask: AddTask_t,
  openTasks: OpenTasks_t
  r: RenderResult
};

export const testApp = async (
  testScript: (app: AppControls) => Promise<void>,
): Promise<void> => {
  const r = render(<App />);
  const app: AppControls = {
    login: login_t(r),
    taskOfOthersSelector: taskOfOthersSelector(r),
    addTask: addTask(r),
    openTasks: openTasks_t(r),
    r
  };
  await app.login.waitUntilDataLoaded();
  await testScript(app);
};
