import React from 'react';
import { TextField, Button } from '@mui/material';

interface AddToDoProps {
  onFormHandler: (id: React.FormEvent) => void;
  onInputHandler: (id: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AddToDoFormLayout: React.FC<AddToDoProps> = ({ onFormHandler, onInputHandler }: AddToDoProps) => {
  return (
    <form className="mb-8" id="form" onSubmit={onFormHandler}>
      <div className="d-flex flex-column justify-content-center align-items-center mb-4">
        <div className="form-outline form-black mb-4">
          <TextField
            variant="outlined"
            size="medium"
            fullWidth
            name="title"
            onChange={onInputHandler}
            label="Task name"
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </div>
        <div className="form-outline form-black">
          <TextField
            variant="outlined"
            sx={{ width: '223px' }}
            size="medium"
            fullWidth
            name="text"
            onChange={onInputHandler}
            label="Task message"
            InputLabelProps={{ style: { color: 'white' } }}
            rows={4}
            multiline
          />
        </div>
      </div>

      <Button variant="outlined" sx={{ background: '#1976d2', color: 'white', '&:hover': { color: '#4f4f4f' }, fontWeight: 'bold' }} type="submit">
        Add new todos
      </Button>
    </form>
  );
};
