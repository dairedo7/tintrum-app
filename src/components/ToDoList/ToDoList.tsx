import React from 'react';
// import styles from './ToDoList.module.scss';

import { IItem } from '../../types/todo';

interface IProps {
  items: IItem[];
  onRemoveToDo: (_id: string) => void;
}

const ToDoList: React.FC<IProps> = (props) => {
  return (
    <ul>
      {props.items.map(({ _id, createdAt, text, title, className }) => (
        <li className={className} key={_id}>
          <div className="card-header">Title: {title}</div>
          <div className="card-body">
            <h5 className="card-title">Created: {createdAt}</h5>
            <p className="card-text">Message: {text}</p>
            <button className="btn btn-primary btn-sm" onClick={props.onRemoveToDo.bind(this, _id)}>
              Remove todo
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
