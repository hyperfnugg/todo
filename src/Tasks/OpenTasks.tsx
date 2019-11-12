import React from 'react';
import useAxios from 'axios-hooks';
import { TaskJson } from './Tasks.types';

export const OpenTasks = ({
  tasks,
  canComplete,
  redraw,
}: {
  tasks: TaskJson[];
  canComplete: boolean;
  redraw: () => void;
}) => {
  const [{ loading, error }, complete] = useAxios<void>(
    {},
    {
      manual: true,
      useCache: false,
    },
  );

  const doComplete = (id: string) => {
    complete({
      url: `/api/tasks/${id}/complete`,
      method: 'put',
    }).then(() => {
      redraw();
    });
  };
  const OpenTask = ({ id, description }: TaskJson) => {
    return (
      <li key={id} data-testid={'OpenTaskItem'}>
        {description}
        {canComplete && <button onClick={() => doComplete(id)}>Done!</button>}
      </li>
    );
  };
  if (loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;
  if (!tasks) {
    return <h3>All tasks done!</h3>;
  }
  return (
    <>
      <h3>To do</h3>
      <ul>{tasks.filter(({ completed }) => !completed).map(OpenTask)}</ul>
    </>
  );
};
