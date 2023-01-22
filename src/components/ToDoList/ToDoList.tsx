import { useEffect } from 'react';

import { useGetPlannedTasksQuery, useRemoveTaskMutation, useUpdateStatusMutation } from '../../services/tasksApi';
import { toast } from 'react-toastify';

const ToDoList = () => {
  const { data: plannedTasks } = useGetPlannedTasksQuery('plan');
  const [removeTask, { isSuccess: isDeleted, isError: isDeletionError, error: deletionError }] = useRemoveTaskMutation();
  const [updateStatus, { isSuccess: isUpdated, isError: isUpdatedError, error: updatedError }] = useUpdateStatusMutation();

  const onRemoveTask = async (id: string) => {
    await removeTask(id);
  };

  const onDoneTask = async (id: any) => {
    await updateStatus(id);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.warn('The task has been removed', {
        position: 'bottom-right',
        theme: 'dark',
      });
    }
    if (isUpdated) {
      toast.warn('The status has been changed', {
        position: 'bottom-right',
        theme: 'dark',
      });
    }
    if (isUpdatedError) {
      toast.error((updatedError as any).message);
    }
    if (isDeletionError) {
      toast.error((deletionError as any).message);
    }
  }, [deletionError, isDeleted, isDeletionError, isUpdated, isUpdatedError, updatedError]);

  return (
    <ul>
      {plannedTasks &&
        plannedTasks.data.result.map(({ _id, createdAt, text, title }: { _id: string; createdAt: string; text: string; title: string }) => (
          <li className="card text-white bg-dark mb-5 w-75 mx-auto" key={_id}>
            <div className="card-header">Title: {title}</div>
            <div className="card-body">
              <h5 className="card-title">Created: {createdAt}</h5>
              <p className="card-text">Message: {text}</p>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const taskId = { taskId: _id };
                    return onDoneTask(taskId);
                  }}
                >
                  Done
                </button>
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

export default ToDoList;
