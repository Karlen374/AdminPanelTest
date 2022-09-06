import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FolderCopySharpIcon from '@mui/icons-material/FolderCopySharp';
import ArticleIcon from '@mui/icons-material/Article';
import { ITableRowProps } from 'src/types/IRow';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { openCreateRow, openEditRow } from 'src/store/slices/tableSlice';
import EditRow from './editRow';
import styles from './componentTable.module.scss';

const TableRows = ({ row }:ITableRowProps) => {
  const { editRowStatus, editRowData } = useAppSelector((store) => store.Table);
  const dispatch = useAppDispatch();
  const rowStyle = {
    fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'start',
  };
  let firstRowStyle = rowStyle;
  if (row.type === 'level' && row.id !== 1) {
    firstRowStyle = {
      fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'center',
    };
  }
  if (row.type === 'row') {
    firstRowStyle = {
      fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'right',
    };
  }
  const openNewRowCreatingForm = () => {
    dispatch(openCreateRow({ parent: row.parent, type: row.type }));
  };
  let rowLevelStyle = (
    <>
      <FolderCopySharpIcon
        onClick={() => dispatch(openCreateRow({ parent: row.parent, type: 'level' }))}
        sx={{ color: '#95FFAC', width: 24, height: 24 }}
        className={styles.changeCursor}
      />
      <ArticleIcon
        onClick={() => dispatch(openCreateRow({ parent: row.id, type: 'row' }))}
        className={styles.changeCursor}
      />
    </>
  );
  if (row.id === 1) {
    rowLevelStyle = (
      <FolderCopySharpIcon
        sx={{ color: '#5F98F5', width: 24, height: 24 }}
      />
    );
  }
  if (editRowStatus && editRowData && editRowData.id === row.id) {
    return (
      <EditRow />
    );
  }
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      onDoubleClick={() => {
        dispatch(openEditRow(row));
      }}
    >
      <TableCell style={{ width: 70 }} sx={firstRowStyle}>
        {(row.type === 'row')
          ? <ArticleIcon className={styles.changeCursor} onClick={openNewRowCreatingForm} /> : rowLevelStyle}
      </TableCell>
      <TableCell sx={rowStyle}>{row.title}</TableCell>
      <TableCell sx={rowStyle}>{(row.type === 'level' && row.parent) || (!row.parent) ? '' : row.unit}</TableCell>
      <TableCell sx={rowStyle}>{(row.type === 'level' && row.parent) || (!row.parent) ? '' : row.quantity}</TableCell>
      <TableCell sx={rowStyle}>{(row.type === 'level' && row.parent) || (!row.parent) ? '' : row.unitPrice}</TableCell>
      <TableCell sx={rowStyle}>{row.price}</TableCell>
    </TableRow>
  );
};
export default TableRows;
