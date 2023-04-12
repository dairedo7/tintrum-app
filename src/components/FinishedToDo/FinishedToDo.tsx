import React, { useEffect } from 'react';

import { useGetDoneTasksQuery, useRemoveTaskMutation } from '../../services/tasksApi';
import { FinishedToDoList } from '../../pages/FinishedToDoList/FinishedToDoList';
import { toast } from 'react-toastify';

const FinishedToDo = () => {
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
  }, [isDeleted, deletionError, isDeletionError]);

  return <ul>{doneTasks && <FinishedToDoList tasks={doneTasks || []} onRemoveTask={onRemoveTask} />}</ul>;
};

export default FinishedToDo;
