import { useState } from 'react';
import ToDoList from '../../components/ToDoList/ToDoList';
import AddToDo from '../../components/AddToDo/AddToDo';
import { toast } from 'react-toastify';

import { IItem } from '../../types/todo';

import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

export const ToDoLayout = () => {
  const [todos, setToDos] = useState<IItem[]>([]);

  const date = new Date().toLocaleString();

  // console.log(date);
  // const date = `${current.getDate()}.${
  //   current.getMonth() + 1
  // }.${current.getFullYear()} at: ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

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
        <div>
          <GoBackBtn />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <AddToDo onAddToDo={addToDo} />
          <ToDoList />
        </div>
      </div>
    </div>
  );
};
