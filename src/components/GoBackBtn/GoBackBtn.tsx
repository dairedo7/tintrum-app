import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styles from './GoBackBtn.module.css';

const GoBackBtn = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.btn_alignment}>
      <Button className="btn mb-4" variant="contained" onClick={navigateHandler}>
        Back
      </Button>
    </div>
  );
};

export default GoBackBtn;
