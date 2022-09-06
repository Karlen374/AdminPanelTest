import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useAppSelector } from 'src/hooks/hooks';
import TableHeader from './tableHeader';
import TableRows from './tableRows';
import CreateRow from './createRow';

const ComponentTable = () => {
  const { createRowStatus, rows } = useAppSelector((store) => store.Table);

  return (
    <TableContainer sx={{ backgroundColor: '#202124', borderRadius: 0 }}>
      <Table aria-label="simple table">
        <TableHeader />
        <TableBody>
          {rows.map((row) => (
            <TableRows key={row.id} row={row} />
          ))}
          {createRowStatus && <CreateRow />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ComponentTable;
