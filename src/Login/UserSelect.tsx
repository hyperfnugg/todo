import { UserJson } from './Login.types';
import React, { useState } from 'react';

export const UserSelect = (args: {
  users: UserJson[];
  selectUser: (_: UserJson) => void;
}) => {
  const [checkedUser, setCheckedUser] = useState<string>();
  const { users, selectUser } = args;
  return (
    <>
      {users.map(({ name }: UserJson) => (
        <div key={name}>
          <input
            type="radio"
            id={name}
            name="loginuser"
            value={name}
            checked={name === checkedUser}
            onChange={() => setCheckedUser(name)}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}
      <button
        disabled={!checkedUser}
        onClick={() => {
          const selectedUser = users.find(user => user.name === checkedUser);
          selectedUser && selectUser(selectedUser);
        }}
      >
        Select
      </button>
    </>
  );
};
