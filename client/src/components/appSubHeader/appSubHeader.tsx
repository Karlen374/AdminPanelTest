import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './appSubHeader.module.scss';

const AppSubHeader = () => {
  return (
    <div className={styles.subHeader}>
      <div className={styles.subHeader__nav}>
        <div>
          <h3 className={styles.subHeader__nav_name}>Название проекта</h3>
          <p className={styles.subHeader__nav_subName}>Аббревиатура</p>
        </div>
        <ExpandMoreIcon className={styles.subHeader__nav_icon} sx={{ color: '#fff' }} />
      </div>
      <div className={styles.subHeader_name}>
        Строительно-монтажные работы
      </div>

    </div>

  );
};
export default AppSubHeader;
