import React from 'react';
import { User } from '../Login/Login.types';
import useAxios from 'axios-hooks';
import { useLoggedIn } from '../Login/LoggedInUserContext';

export const TasksOfOthersSelector = ({
  setViewFor,
}: {
  setViewFor: (_: User) => void;
  viewFor: User;
}) => {
  const [{ data: users, loading, error }] = useAxios<User[]>('/api/users/', {
    manual: false,
    useCache: false,
  });
  const loggedIn = useLoggedIn();
  if (!users || loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  if (!loggedIn || !loggedIn.isBoss) return null;
  return (
    <>
      <h3>Select other persons task to view if you please</h3>
      <select
        defaultValue={loggedIn.name}
        onChange={e => {
          const user = users.find(({ name }) => name === e.target.value);
          user && setViewFor(user);
        }}
      >
        {users.map(({ name }: User) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </>
  );
};
