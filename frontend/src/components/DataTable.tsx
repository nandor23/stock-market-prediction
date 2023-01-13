import { FunctionComponent } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import colors from '../constants/colors';
import { FaCircle } from "react-icons/fa";


interface DataTableProps {
  heads: any;
  data: any;
  successful: any;
}

const DataTable: FunctionComponent<DataTableProps> = (props) => {

  const isPresent = (date: any) => {
    if (props.successful) {
      for (let i = 0; i < props.successful.length; i++) {
        if (props.successful[i].date === date) {
          return true;
        }
      }
    }
    return false;
  }


  return (
  <TableContainer component={Paper} sx={{width: 1200, height: 800, marginBottom: 10}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                backgroundColor: colors.green,
                fontWeight: 600,
                fontSize: 16,
                color: '#fff'
              }
            }}
          >
            {props.heads.map((head: string) => (
              <TableCell key={head} align="center">{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row: any, index: number) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {props.successful && 
                  <FaCircle size={22} style={{marginRight: 20, marginLeft: -20, marginTop: 5, marginBottom: -5}}
                    color={isPresent(row.date) ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'}
                  />
                }
                {row.date}
              </TableCell>
              <TableCell align="center">{row.open}</TableCell>
              <TableCell align="center">{row.high}</TableCell>
              <TableCell align="center">{row.low}</TableCell>
              <TableCell align="center">{row.close}</TableCell>
              <TableCell align="center">{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
