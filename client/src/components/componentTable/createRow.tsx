import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ArticleIcon from '@mui/icons-material/Article';
import FolderCopySharpIcon from '@mui/icons-material/FolderCopySharp';
import React, { useState } from 'react';
import { IRow, IRowData } from 'src/types/IRow';
import { recalculation } from 'src/helpers/recalculation';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { addNewRow, closeCreateRow, recalculateRows } from 'src/store/slices/tableSlice';
import styles from './componentTable.module.scss';

const CreateRow = () => {
  const [title, setTitle] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const { rows, createRowData } = useAppSelector((store) => store.Table);
  const dispatch = useAppDispatch();
  const rowStyle = {
    fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'center',
  };
  let firstRowStyle = rowStyle;
  if (createRowData.type === 'row') {
    firstRowStyle = {
      fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'right',
    };
  }
  const rowLevelStyle = (
    <>
      <FolderCopySharpIcon sx={{ color: '#95FFAC', width: 24, height: 24 }} />
      <ArticleIcon />
    </>
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };
  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
    setPrice(unitPrice * Number(e.target.value));
  };
  const onChangeUnitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(Number(e.target.value));
    setPrice(quantity * Number(e.target.value));
  };

  const saveRow = (rowData: IRow, storage: IRowData[]) => {
    const index = Math.max(...storage.map((v) => v.id), 0) + 1;
    const row: IRowData = { id: index, ...rowData };
    dispatch(addNewRow(row));
    dispatch(closeCreateRow());
    dispatch(recalculateRows(recalculation(row.parent, [...storage, row])));
  };
  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title && ((unit && quantity && unitPrice && price) || createRowData.type === 'level')) {
      const newRow: IRow = {
        title, unit, quantity, unitPrice, price, parent: createRowData.parent, type: createRowData.type,
      };
      saveRow(newRow, rows);
    }
  };
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell style={{ width: 70 }} sx={firstRowStyle}>
        {(createRowData.parent && createRowData.type === 'row')
          ? <ArticleIcon /> : rowLevelStyle}
      </TableCell>
      <TableCell style={{ width: 600 }} sx={rowStyle}>
        <input
          value={title}
          className={styles.editRow}
          type="text"
          placeholder="Наименование работ"
          onChange={onChangeTitle}
          onKeyPress={onEnterKeyDown}
        />
      </TableCell>
      <TableCell style={{ width: 160 }} sx={rowStyle}>
        {createRowData.type === 'row' && (
        <input
          value={unit}
          className={styles.editRow}
          type="text"
          placeholder="Ед. изм."
          onChange={onChangeUnit}
          onKeyPress={onEnterKeyDown}
        />
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} sx={rowStyle}>
        {createRowData.type === 'row' && (
        <input
          value={quantity}
          className={styles.editRow}
          type="number"
          placeholder="Количество"
          onChange={onChangeQuantity}
          onKeyPress={onEnterKeyDown}
        />
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} sx={rowStyle}>
        {createRowData.type === 'row' && (
        <input
          value={unitPrice}
          className={styles.editRow}
          type="number"
          placeholder="Цена за ед."
          onChange={onChangeUnitPrice}
          onKeyPress={onEnterKeyDown}
        />
        )}
      </TableCell>
      <TableCell sx={rowStyle}>
        {price}
      </TableCell>
    </TableRow>
  );
};
export default CreateRow;
