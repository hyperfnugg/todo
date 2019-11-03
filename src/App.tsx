import React, { useState } from 'react';
import './App.css';
import { User } from './types';
import { Tasks } from './Tasks';
import { LoggedInUserContext } from './LoggedInUserContext';
import { Login } from './Login';

const App: React.FC = () => {
  const [loggedInUser, setLoggedinUser] = useState<User | undefined>(undefined);
  return (
    <>
      <Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedinUser} />
      {loggedInUser && (
        <LoggedInUserContext.Provider value={loggedInUser}>
          <Tasks />
        </LoggedInUserContext.Provider>
      )}
    </>
  );
};

export default App;
