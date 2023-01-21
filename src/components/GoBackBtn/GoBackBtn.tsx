import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createSvgIcon } from '@mui/material/utils';

import styles from './GoBackBtn.module.css';

const HomeIcon = createSvgIcon(<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />, 'Home');

const GoBackBtn = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.btn_alignment}>
      <Button className="btn mb-4" variant="contained" startIcon={<HomeIcon />} onClick={navigateHandler}>
        Back
      </Button>
    </div>
  );
};

export default GoBackBtn;
