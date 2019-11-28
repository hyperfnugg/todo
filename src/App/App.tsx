import React, { useState } from 'react';
import './App.css';
import { UserJson } from '../Login/Login.types';
import { Tasks } from '../Tasks/Tasks';
import { LoggedInUserContext } from '../Login/LoggedInUserContext';
import { Login } from '../Login/Login';

const App: React.FC = () => {
  const [loggedInUser, setLoggedinUser] = useState<UserJson | undefined>(undefined);
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
