import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './componentTable.module.scss';

const TableHeader = () => {
  const tabHeadStyle = {
    fontFamily: 'Roboto', lineHeight: '130%', color: '#A1A1AA', borderColor: '#414144',
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={tabHeadStyle} className={styles.headRow}>Уровень</TableCell>
        <TableCell sx={tabHeadStyle} className={styles.headRow}>Наименование работ</TableCell>
        <TableCell sx={tabHeadStyle} className={styles.headRow}>Ед.изм.</TableCell>
        <TableCell sx={tabHeadStyle} className={styles.headRow}>Количество</TableCell>
        <TableCell sx={tabHeadStyle} className={styles.headRow}>Цена за ед.</TableCell>
        <TableCell sx={tabHeadStyle} className={styles.headRow}>Стоимость</TableCell>
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;
