import { useState } from 'react';
import ToDoList from '../../components/ToDoList/ToDoList';
import AddToDo from '../../components/AddToDo/AddToDo';

import { IItem } from '../../types/todo';

import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import DoneBtn from '../../components/DoneBtn/DoneBtn';

export const ActiveToDoLayout = () => {
  const [todos, setToDos] = useState<IItem[]>([]);

  const date = new Date().toLocaleString();

  function addToDo(todo: IItem, todoTitle: IItem) {
    const { title } = todoTitle;
    const { text } = todo;

    setToDos((prevToDos): any => {
      return [
        ...prevToDos,
        {
          _id: Math.random().toString(),
          createdAt: date,
          title: title,
          text: text,
        },
      ];
    });
  }

  return (
    <div className="gradient-custom">
      <div className="container py-4 h-100">
        <div className="d-flex justify-content-between">
          <GoBackBtn />
          <DoneBtn />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <AddToDo onAddToDo={addToDo} />
          <ToDoList />
        </div>
      </div>
    </div>
  );
};
