import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FolderCopySharpIcon from '@mui/icons-material/FolderCopySharp';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import React, { useState, useEffect } from 'react';
import { IRowData } from 'src/types/IRow';
import { recalculation } from 'src/helpers/recalculation';
import { closeEditRow, saveEditRow, recalculateRows } from 'src/store/slices/tableSlice';
import styles from './componentTable.module.scss';

const EditRow = () => {
  const { editRowData, rows } = useAppSelector((store) => store.Table);
  const [title, setTitle] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (editRowData) {
      setTitle(editRowData.title);
      setUnit(editRowData.unit);
      setQuantity(editRowData.quantity);
      setUnitPrice(editRowData.unitPrice);
      setPrice(editRowData.price);
    }
  }, []);

  const rowStyle = {
    fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'start',
  };
  let firstRowStyle = rowStyle;
  if (editRowData?.type === 'level' && editRowData?.id !== 1) {
    firstRowStyle = {
      fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'center',
    };
  }
  if (editRowData?.type === 'row') {
    firstRowStyle = {
      fontFamily: 'Roboto', lineHeight: '130%', color: '#FFFFFF', borderColor: '#414144', textAlign: 'right',
    };
  }
  let rowLevelStyle = (
    <>
      <FolderCopySharpIcon sx={{ color: '#95FFAC', width: 24, height: 24 }} />
      <ArticleIcon />
    </>
  );
  if (editRowData?.id === 1) {
    rowLevelStyle = (
      <FolderCopySharpIcon
        sx={{ color: '#5F98F5', width: 24, height: 24 }}
      />
    );
  }
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
  function editRow(row: IRowData) {
    dispatch(saveEditRow(row));
    dispatch(closeEditRow());
    const storage = rows.map((item) => {
      if (item.id === row.id) return row;
      else return item;
    });
    dispatch(recalculateRows(recalculation(row.parent, storage)));
  }
  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title && ((unit && quantity && unitPrice && price) || editRowData?.type === 'level')) {
      if (editRowData) {
        const newRow: IRowData = {
          title,
          unit,
          quantity,
          unitPrice,
          price,
          parent: editRowData.parent,
          type: editRowData.type,
          id: editRowData.id,
        };
        editRow(newRow);
      }
    }
  };
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell style={{ width: 70 }} sx={firstRowStyle}>
        {(editRowData?.parent && editRowData?.parent > 1)
          ? <ArticleIcon /> : rowLevelStyle}
      </TableCell>
      <TableCell
        style={{ width: 600 }}
        sx={rowStyle}
      >
        <input
          className={styles.editRow}
          type="text"
          placeholder={editRowData?.title}
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onEnterKeyDown}
        />
      </TableCell>
      <TableCell style={{ width: 160 }} sx={rowStyle}>
        {editRowData?.type === 'row' && (
        <input
          className={styles.editRow}
          type="text"
          placeholder={editRowData?.unit}
          value={unit}
          onChange={onChangeUnit}
          onKeyPress={onEnterKeyDown}
        />
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} sx={rowStyle}>
        {editRowData?.type === 'row' && (
        <input
          className={styles.editRow}
          type="number"
          placeholder={String(editRowData?.quantity)}
          value={quantity}
          onChange={onChangeQuantity}
          onKeyPress={onEnterKeyDown}
        />
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} sx={rowStyle}>
        {editRowData?.type === 'row' && (
        <input
          className={styles.editRow}
          type="number"
          placeholder={String(editRowData?.unitPrice)}
          value={unitPrice}
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
export default EditRow;
