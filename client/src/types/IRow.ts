export interface IRow{
  title: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  price: number;
  parent: number | null;
  type: 'level' | 'row';
}
export interface IRowData extends IRow {
  id: number;
}
export interface ITableRowProps{
  row: IRowData;
}
