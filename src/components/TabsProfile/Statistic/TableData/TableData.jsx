import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TableData = (props) => {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const tableCell = props.data.map((item) => (
    <StyledTableRow key={item.month}>
      <TableCell>{item.date}</TableCell>
      <TableCell>{item.salary}</TableCell>
      <TableCell>
        <Button onClick={() => props.deleteItem(item.date)} color={'error'}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </TableCell>
    </StyledTableRow>
  ));
  return (
    <Box>
      <Table sx={{ border: "1px solid #E0E0E0", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: "200px" }}>Month</TableCell>
            <TableCell>Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableCell}</TableBody>
      </Table>
    </Box>
  );
};

export default TableData;
