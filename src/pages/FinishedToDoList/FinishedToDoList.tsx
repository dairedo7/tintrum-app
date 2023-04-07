import React, { useState, useEffect } from 'react';

import { IItemArr } from '../../types/todoArr';

interface TasksProps {
  tasks: IItemArr;
  onRemoveTask: (id: string) => void;
}

export const FinishedToDoList: React.FC<TasksProps> = ({ tasks, onRemoveTask }: TasksProps) => {
  const [isTasks, setIsTasks] = useState<boolean>(false);

  useEffect(() => {
    if (tasks.data.result.length) {
      setIsTasks(true);
    }
  }, [tasks]);

  return (
    <>
      {isTasks ? (
        tasks.data.result.map(({ _id, createdAt, text, title }: { _id: string; createdAt: string; text: string; title: string }) => (
          <li className="card text-white bg-dark mb-5 w-75 mx-auto" key={_id}>
            <div className="card-header">Title: {title}</div>
            <div className="card-body">
              <h5 className="card-title">Created: {createdAt}</h5>
              <p className="card-text">Message: {text}</p>
              <div className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={onRemoveTask.bind(this, _id)}>
                  Remove todo
                </button>
              </div>
            </div>
          </li>
        ))
      ) : (
        <h2 className="display-5 text-white">No tasks have been added yet</h2>
      )}
    </>
  );
};
