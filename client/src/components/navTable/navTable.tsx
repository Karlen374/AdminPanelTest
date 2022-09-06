import NavItem from 'src/components/navTable/navItem';
import styles from './navTable.module.scss';

const navData = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
];
const NavTable = () => {
  return (
    <div className={styles.nav}>
      {
        navData.map((item, id) => {
          return (
            <NavItem text={item} key={id} />
          );
        })
      }
    </div>
  );
};
export default NavTable;
