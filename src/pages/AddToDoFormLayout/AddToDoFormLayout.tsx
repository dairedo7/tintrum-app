import React from 'react';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

interface AddToDoProps {
  onFormHandler: (id: React.FormEvent) => void;
  onInputHandler: (id: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AddToDoFormLayout: React.FC<AddToDoProps> = ({ onFormHandler, onInputHandler }: AddToDoProps) => {
  return (
    <form className="mb-8" id="form" onSubmit={onFormHandler}>
      <div className="d-flex flex-column justify-content-center align-items-center mb-4">
        <div className="form-outline form-black mb-4">
          <MDBInput className="form-control-lg" type="text" name="title" onChange={onInputHandler} label="Task name" contrast />
        </div>
        <div className="form-outline form-black">
          <MDBTextArea className="form-control-lg" name="text" label="Task message" onChange={onInputHandler} contrast />
        </div>
      </div>

      <button className="btn btn-secondary btn-lg" type="submit">
        Add new todos
      </button>
    </form>
  );
};
