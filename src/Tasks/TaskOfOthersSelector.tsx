import React, { useState } from 'react';
import { User } from '../Login/Login.types';
import useAxios from 'axios-hooks';
import { useLoggedIn } from '../Login/LoggedInUserContext';
import { UserSelect } from '../Login/UserSelect';

export const TasksOfOthersSelector = ({
  setViewFor,
  viewFor,
}: {
  setViewFor: (_: User) => void;
  viewFor: User;
}) => {
  const [{ data: users, loading, error }] = useAxios<User[]>('/api/users/', {
    manual: false,
    useCache: false,
  });
  const [showSelect, setShowSelect] = useState(false);
  const loggedIn = useLoggedIn();
  if (!users || loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  if (!loggedIn || !loggedIn.isBoss) return null;
  if (!showSelect && viewFor !== loggedIn) {
    return (
      <p>
        You are viewing the tasks of <strong>{viewFor.name}</strong>.{' '}
        <button onClick={() => setViewFor(loggedIn)}>Back to own tasks</button>
      </p>
    );
  }
  if (!showSelect) {
    return (
      <p>
        You can view and edit tasks for others{' '}
        <button onClick={() => setShowSelect(true)}>+</button>
      </p>
    );
  }
  const otherUsers = users.filter(user => user.name !== loggedIn.name);
  const changeViewFor = (user: User) => {
    setShowSelect(false);
    setViewFor(user);
  };
  return (
    <>
      <h3>
        Select persons<button onClick={() => setShowSelect(false)}>-</button>
      </h3>
      <UserSelect users={otherUsers} selectUser={changeViewFor} />
    </>
  );
};
