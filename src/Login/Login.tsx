import React from 'react';
import { UserJson } from './Login.types';
import useAxios from 'axios-hooks';
import { UserSelect } from './UserSelect';

export const Login = ({
  setLoggedInUser,
  loggedInUser,
}: {
  setLoggedInUser: (_: UserJson | undefined) => void;
  loggedInUser: UserJson | undefined;
}) => {
  const [{ data: users, loading, error }] = useAxios<UserJson[]>('/api/users', {
    manual: false,
  });
  if (!users || loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  if (loggedInUser)
    return (
      <p>
        {`Logged in as ${loggedInUser.name}`}
        <button onClick={() => setLoggedInUser(undefined)}>log out</button>
      </p>
    );

  return (
    <>
      <h1>Log in</h1>
      <label htmlFor="user_dropdown">Select yourself</label>
      <UserSelect users={users} selectUser={setLoggedInUser} />
    </>
  );
};
