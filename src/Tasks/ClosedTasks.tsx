import React from 'react';
import useAxios from 'axios-hooks';
import {TaskJson} from "./Tasks.types";

export const ClosedTasks = ({
  tasks,
  canReset,
  redraw,
}: {
  tasks: TaskJson[];
  canReset: boolean;
  redraw: () => void;
}) => {
  const [{ loading, error }, reset] = useAxios<void>(
    {},
    {
      manual: true,
      useCache: false,
    },
  );

  const doReset = (id: string) => {
    reset({
      url: `/api/tasks/${id}/reset`,
      method: 'put',
    }).then(() => {
      redraw();
    });
  };
  if (!tasks) {
    return null;
  }

  if (loading) return <h1>loading...</h1>;
  if (!!error) return <h1>{`Error: ${error.message}`}</h1>;

  const ClosedTask = ({ id, description }: TaskJson) => {
    return (
      <li key={id}>
        <span style={{ textDecoration: 'line-through' }}>{description}</span>
        {canReset && (
          <button
            onClick={() => {
              doReset(id);
            }}
          >
            reset
          </button>
        )}
      </li>
    );
  };
  return (
    <>
      <h3>Done</h3>
      <ul>{tasks.filter(({ completed }) => completed).map(ClosedTask)}</ul>
    </>
  );
};
