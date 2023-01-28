import { useState, useEffect } from 'react';
import { AddToDoFormLayout } from '../../pages/AddToDoFormLayout/AddToDoFormLayout';
import { IItem } from '../../types/todo';

import { useAddTaskMutation } from '../../services/tasksApi';
import { useAppDispatch } from '../../app/hooks';
import { setTasksList } from '../../features/taskSlice';

import { toast } from 'react-toastify';

type OnlyText = Pick<IItem, 'text'>;
type OnlyTitle = Pick<IItem, 'title'>;

const initialState = {
  title: '',
  text: '',
};

const AddToDo: React.FC = () => {
  const [todo, textToDo] = useState<Partial<OnlyText>>();
  const [todoTitle, titleToDo] = useState<Partial<OnlyTitle>>();

  const [formValue, setFormValue] = useState(initialState);
  const { title, text } = formValue;

  const [addTask, { data: taskData, isSuccess: isTaskAddedSuccess, isError: isTaskAddedError, error: taskAddedError }] = useAddTaskMutation();
  const dispatch = useAppDispatch();

  function inputHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    textToDo({
      text: e.target.value,
    });
    titleToDo({
      title: e.target.value,
    });
    setFormValue({ ...formValue, [e.target.name]: [e.target.value] });
  }

  function formHandler(e: React.FormEvent) {
    e.preventDefault();
    if (todo?.text && todoTitle?.title) {
      postToDo();
      (document.getElementById('form') as HTMLFormElement).reset();
      todo.text = '';
    }
    return;
  }

  const postToDo = async () => {
    const titleStr = title.toString();
    const textStr = text.toString();

    if (title && text) {
      await addTask({ title: titleStr, text: textStr });
    }
  };

  useEffect(() => {
    if (isTaskAddedError) {
      toast.error((taskAddedError as any).data.message);
    }
    if (isTaskAddedSuccess) {
      toast.info('New task has been added', {
        position: 'top-right',
        theme: 'dark',
      });

      dispatch(
        setTasksList({
          title: taskData.data.result.title,
          createdAt: taskData.data.result.createdAt,
          text: taskData.data.result.text,
          _id: taskData.data.result._id,
        })
      );
    }
  }, [dispatch, isTaskAddedError, isTaskAddedSuccess, taskAddedError, taskData]);

  return (
    <>
      <AddToDoFormLayout onFormHandler={formHandler} onInputHandler={inputHandler} />
    </>
  );
};

export default AddToDo;
