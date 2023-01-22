import FinishedToDoList from '../../components/FinishedToDoList/FinishedToDoList';
import DashboardBtn from '../../components/DashboardBtn/DashboardBtn';

export const FinishedToDoLayout = () => {
  return (
    <div className="gradient-custom">
      <div className="container py-4 h-100">
        <div>
          <DashboardBtn />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <FinishedToDoList />
        </div>
      </div>
    </div>
  );
};
