import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TerminalIcon from '@mui/icons-material/Terminal';
import styles from './DashboardBtn.module.css';

const DashboardBtn = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/tasks');
  };

  return (
    <div className={styles.btn_alignment}>
      <Button className="btn mb-4" variant="contained" startIcon={<TerminalIcon />} onClick={navigateHandler}>
        Back to Tasks
      </Button>
    </div>
  );
};

export default DashboardBtn;
