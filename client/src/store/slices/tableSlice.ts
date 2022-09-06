import { createSlice, current } from '@reduxjs/toolkit';
import { IRowData } from 'src/types/IRow';

interface ICreateRowData{
  parent: number;
  type: 'level' | 'row';
}
interface TableState {
  createRowStatus: boolean;
  editRowStatus: boolean;
  rows: IRowData[];
  createRowData: ICreateRowData;
  editRowData: IRowData | null;
}
const initialState:TableState = {
  createRowStatus: false,
  editRowStatus: true,
  rows: [
    {
      title: 'Южная строительная площадка',
      unit: '0',
      quantity: 0,
      unitPrice: 0,
      price: 1500,
      parent: null,
      type: 'level',
      id: 1,
    },
    {
      title: 'Фундаментальные работы',
      unit: '0',
      quantity: 0,
      unitPrice: 0,
      price: 1500,
      parent: 1,
      type: 'level',
      id: 2,
    },
    {
      title: 'Статья работы № 1',
      unit: 'м3',
      quantity: 10,
      unitPrice: 150,
      price: 1500,
      parent: 2,
      type: 'row',
      id: 3,
    },
  ],
  createRowData: {
    parent: 2,
    type: 'row',
  },
  editRowData: {
    title: 'Статья работы № 1',
    unit: 'м3',
    quantity: 10,
    unitPrice: 150,
    price: 1500,
    parent: 2,
    type: 'row',
    id: 3,
  },

};

const TableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    closeCreateRow: (state) => {
      state.createRowStatus = false;
    },
    openCreateRow: (state, action) => {
      state.createRowStatus = true;
      state.createRowData = action.payload;
    },
    openEditRow: (state, action) => {
      state.editRowStatus = true;
      state.editRowData = action.payload;
    },
    closeEditRow: (state) => {
      state.editRowStatus = false;
    },
    addNewRow: (state, action) => {
      const currentBlockRows = current(state.rows).filter((item) => item.parent === action.payload.parent).length;
      if (action.payload.type === 'level') {
        state.rows = [...state.rows, action.payload];
      } else {
        let check = false;
        let count = 0;
        for (let i = 0; i < current(state.rows).length; i++) {
          if (!check && current(state.rows)[i].parent !== action.payload.parent) count++;
          if (current(state.rows)[i].parent === action.payload.parent) check = true;
        }
        const newArr = [...current(state.rows)];
        newArr.splice(currentBlockRows + count, 0, action.payload);
        state.rows = newArr;
      }
    },
    saveEditRow: (state, action) => {
      state.rows = current(state.rows).map((item) => {
        if (item.id !== action.payload.id) return item;
        else return action.payload;
      });
    },
    recalculateRows: (state, action) => {
      if (action.payload) {
        state.rows = current(state.rows).map((item) => {
          if (item.id !== action.payload[0]?.id) return item;
          else return action.payload[0];
        });
      }
    },
  },
});

const { actions, reducer } = TableSlice;

export default reducer;

export const {
  closeCreateRow,
  addNewRow,
  saveEditRow,
  openCreateRow,
  recalculateRows,
  openEditRow,
  closeEditRow,
} = actions;
