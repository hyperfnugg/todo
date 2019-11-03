import React, { useContext } from 'react';
import { User } from './types';

const defaultUser: User = { name: 'Notused', isBoss: false };
export const LoggedInUserContext = React.createContext<User>(defaultUser);
export const useLoggedIn = () => useContext(LoggedInUserContext);
