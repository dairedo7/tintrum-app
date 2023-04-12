import { useEffect } from 'react';
import { PlannedToDoList } from '../../pages/PlannedToDoList/PlannedToDoList';

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
      toast.success('Congratz! Task has been done', {
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

  return <ul>{plannedTasks && <PlannedToDoList tasks={plannedTasks} onRemoveTask={onRemoveTask} onDoneTask={onDoneTask} />}</ul>;
};

export default ToDoList;
