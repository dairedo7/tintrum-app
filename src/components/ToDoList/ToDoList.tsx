import React from 'react';
import styles from './ToDoList.module.scss';

import { IItem } from '../../types/todo';

interface IProps {
  items: IItem[];
  onRemoveToDo: (id: string) => void;
}

const ToDoList: React.FC<IProps> = (props) => {
  return (
    <ul>
      {props.items.map(({ id, text, className }) => (
        <li className={className} key={id}>
          <p>ID: {id}</p>
          <p>Message: {text}</p>
          <button onClick={props.onRemoveToDo.bind(this, id)}>Remove todo</button>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
