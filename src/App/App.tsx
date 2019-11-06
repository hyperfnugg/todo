import React, { useState } from 'react';
import './App.css';
import { User } from '../Login/Login.types';
import { Tasks } from '../Tasks/Tasks';
import { LoggedInUserContext } from '../Login/LoggedInUserContext';
import { Login } from '../Login/Login';

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
