import DashboardBtn from '../../components/Buttons/DashboardBtn/DashboardBtn';
import FinishedToDo from '../../components/FinishedToDo/FinishedToDo';

export const FinishedToDoLayout = () => {
  return (
    <>
      <div className="gradient-custom">
        <div className="container py-4 h-100">
          <div>
            <DashboardBtn />
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <FinishedToDo />
          </div>
        </div>
      </div>
    </>
  );
};
