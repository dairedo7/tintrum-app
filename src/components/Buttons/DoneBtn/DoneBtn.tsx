import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import styles from './DoneBtn.module.css';

const DoneBtn = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/finished');
  };

  return (
    <div className={styles.btn_alignment}>
      <Button className="btn mb-4" variant="contained" startIcon={<AssignmentTurnedInIcon />} onClick={navigateHandler}>
        Done Tasks
      </Button>
    </div>
  );
};

export default DoneBtn;
