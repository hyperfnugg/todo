import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { step } from '../test/step';

test('As a employee I want to log into the system to view my tasks', async () => {
  const employee = { name: 'employee', isBoss: true };
  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [employee]);
  mock.onGet('/api/tasks').reply(200, [
    {
      id: '1212',
      description: 'testtask',
      assignee: 'employee',
      completed: false,
    },
  ]);

  const { queryByText, queryAllByText, findByText, getByText } = render(
    <App />,
  );

  step('employee logs in in the login page');
  await findByText('Log in');
  fireEvent.click(getByText('employee'));
  fireEvent.click(getByText('Select'));

  step('task list is shown');
  await findByText('Logged in as employee');
  expect(queryByText('To do')).toBeInTheDocument();
  expect(queryAllByText('Done!')).toHaveLength(1);
});

test('As a user I want to log out of the system to protect my data', async () => {
  const employee = { name: 'employee', isBoss: true };
  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [employee]);
  mock.onGet('/api/tasks').reply(200, [
    {
      id: '1212',
      description: 'testtask',
      assignee: 'employee',
      completed: false,
    },
  ]);

  const { findByText, getByText } = render(
    <App />,
  );

  step('employee logs in in the login page');
  await findByText('Log in');
  fireEvent.click(getByText('employee'));
  fireEvent.click(getByText('Select'));

  step('employee is logged in');
  await findByText('Logged in as employee');

  step('employee logs out');
  fireEvent.click(getByText('log out'));

  step('login page is shown');
  await findByText('Log in');
});
