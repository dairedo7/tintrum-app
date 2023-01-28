import ToDoList from '../../components/ToDoList/ToDoList';
import AddToDo from '../../components/AddToDo/AddToDo';

import GoBackBtn from '../../components/Buttons/GoBackBtn/GoBackBtn';
import DoneBtn from '../../components/Buttons/DoneBtn/DoneBtn';

export const ActiveToDoLayout = () => {
  return (
    <div className="gradient-custom">
      <div className="container py-4 h-100">
        <div className="d-flex justify-content-between">
          <GoBackBtn />
          <DoneBtn />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <AddToDo />
          <ToDoList />
        </div>
      </div>
    </div>
  );
};
