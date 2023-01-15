import React, { useState } from 'react';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { IItem } from '../../types/todo';

interface IProps {
  onAddToDo: (todo: IItem, todoTitle: IItem) => void;
}

type OnlyText = Pick<IItem, 'text'>;
type OnlyTitle = Pick<IItem, 'title'>;

const AddToDo: React.FC<IProps> = (props) => {
  const [todo, textToDo] = useState<Partial<OnlyText>>();
  const [todoTitle, titleToDo] = useState<Partial<OnlyTitle>>();

  function inputHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    textToDo({
      text: e.target.value,
    });
    titleToDo({
      title: e.target.value,
    });
  }

  function formHandler(e: React.FormEvent | React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (todo?.text && todoTitle?.title) {
      props.onAddToDo(todo as IItem, todoTitle as IItem);
      (document.getElementById('form') as HTMLFormElement).reset();
      todo.text = '';
    }
    return;
  }

  return (
    <form className="mb-8" id="form" onSubmit={formHandler}>
      <div className="d-flex flex-column justify-content-center align-items-center mb-4">
        <div className="form-outline form-black mb-4">
          <MDBInput className="form-control-lg" type="text" name="firstName" onChange={inputHandler} label="Task name" contrast />
        </div>
        <div className="form-outline form-black">
          <MDBTextArea className="form-control-lg" name="firstName" label="Task message" onChange={inputHandler} contrast />
        </div>
      </div>
      <button className="btn btn-secondary btn-lg" type="submit">
        Add new todo
      </button>
    </form>
  );
};

export default AddToDo;
