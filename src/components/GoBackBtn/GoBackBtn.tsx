import { useNavigate } from 'react-router-dom';

import styles from './GoBackBtn.module.css';

const GoBackBtn = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.btn_alignment}>
      <button className="btn mb-4" onClick={navigateHandler}>
        Back
      </button>
    </div>
  );
};

export default GoBackBtn;
