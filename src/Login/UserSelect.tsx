import {User} from "./Login.types";
import React, {useState} from "react";

export const UserSelect = (args: { users: User[], selectUser: (_ : User)=>void }) => {
    const [checkedUser, setCheckedUser] = useState<string>();
    const {users, selectUser} = args;
    return <>
        {users.map(({name}: User) => (
            <div key={name}>
                <input
                    type="radio"
                    id={name}
                    name="loginuser"
                    value={name}
                    checked={name === checkedUser}
                    onChange={e => {
                        console.log('clicked!', e.target.value);
                        setCheckedUser(name);
                    }}
                />
                <label htmlFor={name}>{name}</label>
            </div>
        ))}
        <button disabled={!checkedUser}
                onClick={() => {
                    const selectedUser =users.find(user => user.name === checkedUser) ;
                    selectedUser && selectUser(selectedUser);
                }}>Select
        </button>
    </>
}