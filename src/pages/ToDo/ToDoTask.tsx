import { useState } from 'react';
import ToDoList from '../../components/ToDoList/ToDoList';
import AddToDo from '../../components/AddToDo/AddToDo';
import { toast } from 'react-toastify';

import { IItem } from '../../types/todo';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

export const ToDoLayout = () => {
  const [todos, setToDos] = useState<IItem[]>([]);

  const current = new Date();

  const date = `${current.getDate()}.${
    current.getMonth() + 1
  }.${current.getFullYear()} at: ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  function addToDo(todo: IItem, todoTitle: IItem) {
    setToDos((prevToDos): any => {
      return [
        ...prevToDos,
        {
          _id: Math.random().toString(),
          createdAt: date,
          title: todoTitle.title,
          text: todo.text,
        },
      ];
    });
    toast.info('New task has been added', {
      position: 'top-right',
      theme: 'dark',
    });
  }
  function removeToDo(_id: string) {
    setToDos((prevToDos): any => {
      return prevToDos.filter((item) => item._id !== _id);
    });
    toast.warn('The task has been removed', {
      position: 'bottom-right',
      theme: 'dark',
    });
  }
  return (
    <div className="gradient-custom">
      <div className="container py-4 h-100">
        <div>
          <GoBackBtn />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <AddToDo onAddToDo={addToDo} />
          <ToDoList onRemoveToDo={removeToDo} items={todos} />
        </div>
      </div>
    </div>
  );
};
