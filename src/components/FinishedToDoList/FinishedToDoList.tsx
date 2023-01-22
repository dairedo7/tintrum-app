import React, { useEffect } from 'react';

import { useGetDoneTasksQuery, useRemoveTaskMutation } from '../../services/tasksApi';

import { toast } from 'react-toastify';

const FinishedToDoList = () => {
  const { data: doneTasks } = useGetDoneTasksQuery('done');

  const [removeTask, { isSuccess: isDeleted, isError: isDeletionError, error: deletionError }] = useRemoveTaskMutation();

  const onRemoveTask = async (id: string) => {
    await removeTask(id);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.warn('The task has been removed', {
        position: 'bottom-right',
        theme: 'dark',
      });
    }
    if (isDeletionError) {
      toast.error((deletionError as any).message);
    }
  }, [deletionError, isDeleted, isDeletionError]);

  return (
    <ul>
      {doneTasks &&
        doneTasks.data.result.map(({ _id, createdAt, text, title }: { _id: string; createdAt: string; text: string; title: string }) => (
          <li className="card text-white bg-dark mb-5 w-75 mx-auto" key={_id}>
            <div className="card-header">Title: {title}</div>
            <div className="card-body">
              <h5 className="card-title">Created: {createdAt}</h5>
              <p className="card-text">Message: {text}</p>
              <div className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={() => onRemoveTask(_id)}>
                  Remove todo
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default FinishedToDoList;
