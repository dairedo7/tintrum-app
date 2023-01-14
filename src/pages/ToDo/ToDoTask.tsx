import React, { useState } from 'react';
import ToDoList from '../../components/ToDoList/ToDoList';
import AddToDo from '../../components/AddToDo/AddToDo';
import { toast } from 'react-toastify';

import { IItem } from '../../types/todo';

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
          id: Math.random().toString(),
          createdAt: date,
          title: todoTitle.title,
          text: todo.text,
          className: 'card text-white bg-dark mb-5 w-75 mx-auto',
        },
      ];
    });
    toast.info('New task has been added', {
      position: 'top-right',
      theme: 'dark',
    });
  }
  function removeToDo(id: string) {
    setToDos((prevToDos): any => {
      return prevToDos.filter((item) => item.id !== id);
    });
    toast.warn('The task has been removed', {
      position: 'bottom-right',
      theme: 'dark',
    });
  }
  return (
    <div className="gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <AddToDo onAddToDo={addToDo} />
          <ToDoList onRemoveToDo={removeToDo} items={todos} />
        </div>
      </div>
    </div>
  );
};
