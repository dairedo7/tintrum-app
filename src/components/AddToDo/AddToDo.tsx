import React, { useState } from 'react';

import { IItem } from '../../types/todo';

interface IProps {
  onAddToDo: (todo: IItem) => void;
}

type OnlyText = Pick<IItem, 'text'>;

const AddToDo: React.FC<IProps> = (props) => {
  const [todo, textToDo] = useState<Partial<OnlyText>>();

  function textHandler(e: React.ChangeEvent<HTMLInputElement>) {
    textToDo({
      text: e.target.value,
    });
  }

  function formHandler(e: React.FormEvent | React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (todo?.text) {
      props.onAddToDo(todo as IItem);
      (document.getElementById('form') as HTMLFormElement).reset();
      todo.text = '';
    }
    return;
  }

  return (
    <div>
      {' '}
      <form id="form" onSubmit={formHandler}>
        <div>
          <span>Add title</span>
          <input type="text" id="add-todo" onChange={textHandler}></input>
        </div>
        <button type="submit">Add new todo</button>
      </form>
    </div>
  );
};

export default AddToDo;
