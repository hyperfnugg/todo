import React, { useState } from 'react';
import { User } from '../Login/Login.types';
import useAxios from 'axios-hooks';

export const AddTask = ({
  redraw,
  viewFor,
}: {
  redraw: () => void;
  viewFor: User;
}) => {
  const [descr, setDescr] = useState<string>('');
  const [{ loading, error }, postTask] = useAxios<void>(
    {
      url: '/api/tasks',
      method: 'post',
      data: {
        description: descr,
        assignee: viewFor.name,
      },
    },
    {
      manual: true,
      useCache: false,
    },
  );
  if (loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  const createTask = () => {
    postTask().then(() => {
      redraw();
      return;
    });
  };
  return (
    <>
      <input
        data-testid="add-task-input"
        onChange={e => setDescr(e.target.value || '')}
      />
      <button disabled={!descr} onClick={createTask}>
        add
      </button>
    </>
  );
};
