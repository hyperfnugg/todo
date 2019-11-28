import React, { useContext } from 'react';
import { UserJson } from './Login.types';

const defaultUser: UserJson = { name: 'Notused', isBoss: false };
export const LoggedInUserContext = React.createContext<UserJson>(defaultUser);
export const useLoggedIn = () => useContext(LoggedInUserContext);
