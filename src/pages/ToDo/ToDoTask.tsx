import React, { useState } from 'react';
import ToDoList from '../../components/ToDoList/ToDoList';
import AddToDo from '../../components/AddToDo/AddToDo';

import { IItem } from '../../types/todo';

export const ToDoLayout = () => {
  const [todos, setToDos] = useState<IItem[]>([]);

  function addToDo(todo: IItem) {
    setToDos((prevToDos): any => {
      return [
        ...prevToDos,
        {
          id: Math.random().toString(),
          text: todo.text,
        },
      ];
    });
  }
  function removeToDo(id: string) {
    setToDos((prevToDos): any => {
      return prevToDos.filter((item) => item.id !== id);
    });
  }
  return (
    <>
      <AddToDo onAddToDo={addToDo} />
      <ToDoList onRemoveToDo={removeToDo} items={todos} />
    </>
  );
};
