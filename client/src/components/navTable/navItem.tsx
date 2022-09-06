import DashboardIcon from '@mui/icons-material/Dashboard';
import styles from './navTable.module.scss';

interface INavItemProps{
  text: string;
}
const NavItem = ({ text }:INavItemProps) => {
  let itemStyle = styles.nav__item;
  if (text === 'СМР') itemStyle = styles.nav__item_active;
  return (
    <div className={itemStyle}>
      <DashboardIcon className={styles.nav__item_icon} sx={{ color: '#fff' }} />
      <p className={styles.nav__item_text}>{text}</p>
    </div>
  );
};
export default NavItem;
