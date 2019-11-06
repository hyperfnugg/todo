import React, {useState} from 'react';
import { User } from './Login.types';
import useAxios from 'axios-hooks';

export const Login = ({
  setLoggedInUser,
  loggedInUser,
}: {
  setLoggedInUser: (_: User | undefined) => void;
  loggedInUser: User | undefined;
}) => {
  const [checkedUser, setCheckedUser] = useState<string>();
  const [{ data: users, loading, error }] = useAxios<User[]>('/api/users', {
    manual: false,
  });
  if (!users || loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  if (loggedInUser) return <p>{`Logged in as ${loggedInUser.name}`}</p>;

  return (
    <>
      <h1>Log in</h1>
      <label htmlFor="user_dropdown">Select yourself</label>
      {users.map(({ name }: User) => (
        <div key={name}>
          <input
            type="radio"
            id={name}
            name="loginuser"
            value={name}
            checked={name===checkedUser}
            onChange={e => {
              console.log('clicked!', e.target.value);
              setCheckedUser(name);
            }}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}
      <button disabled={!checkedUser} onClick={() => setLoggedInUser(users.find(user => user.name===checkedUser))}>Select</button>
    </>
  );
};
