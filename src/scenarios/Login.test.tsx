import '@testing-library/jest-dom/extend-expect';
import App from '../App/App';
import axios from 'axios';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

const bossuser = { name: 'testuser1', isBoss: true };
const user2 = { name: 'testuser2', isBoss: false };

test('As a user I want to log into the system to view my tasks', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('/api/users').reply(200, [bossuser]);
  mock.onGet('/api/tasks').reply(200, [{
    id:'1212',
    description:'testtask',
    assignee: 'testuser1',
    completed:false
  }]);

  const { findByText, getByText } = render(
    <App />,
  );

  await findByText('Log in');

  fireEvent.click(getByText('testuser1'));

  fireEvent.click(getByText('Select'));
  await findByText('Logged in as testuser1');
});
