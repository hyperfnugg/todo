import React, { useEffect, useState } from 'react';
import { User } from '../Login/Login.types';
import useAxios from 'axios-hooks';
import { useLoggedIn } from '../Login/LoggedInUserContext';
import { TasksOfOthersSelector } from './TaskOfOthersSelector';
import { OpenTasks } from './OpenTasks';
import { ClosedTasks } from './ClosedTasks';
import { AddTask } from './AddTask';
import {TaskJson} from "./Tasks.types";

export const Tasks = () => {
  const [generation, setGeneration] = useState(0);
  const loggedIn = useLoggedIn();
  const [viewFor, setViewFor] = useState<User>(loggedIn);
  const redraw = () => setGeneration(generation + 1);
  const [{ data: tasks, loading, error }, refetch] = useAxios<TaskJson[]>(
    '/api/tasks',
    {
      manual: true,
      useCache: false,
    },
  );
  useEffect(() => {
    refetch();
  }, [generation, refetch]);
  if (!tasks || loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  const view = tasks.filter(({ assignee }) => assignee === viewFor.name);
  return (
    <>
      <TasksOfOthersSelector viewFor={viewFor} setViewFor={setViewFor} />
      <OpenTasks
        tasks={view}
        canComplete={loggedIn.name === viewFor.name}
        redraw={redraw}
      />
      <AddTask redraw={redraw} viewFor={viewFor} />
      <ClosedTasks tasks={view} canReset={loggedIn.isBoss} redraw={redraw} />
    </>
  );
};
