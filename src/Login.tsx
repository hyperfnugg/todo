import React from 'react';
import { User } from './types';
import useAxios from 'axios-hooks';

export const Login = ({
  setLoggedInUser,
  loggedInUser,
}: {
  setLoggedInUser: (_: User | undefined) => void;
  loggedInUser: User | undefined;
}) => {
  const [{ data: users, loading, error }] = useAxios<User[]>('/api/users/', {
    manual: false,
  });
  if (!users || loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  if (loggedInUser) return <p>Logged in as {loggedInUser.name}</p>;

  return (
    <>
      <h1>Log in</h1>
      <p>Select yourself</p>
      <select
        onChange={e => {
          const user = users.find(({ name }) => name === e.target.value);
          setLoggedInUser(user);
        }}
      >
        <option key={'empty'}>Please select one</option>
        {users.map(({ name }: User) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </>
  );
};
