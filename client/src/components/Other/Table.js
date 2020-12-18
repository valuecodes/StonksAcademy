import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { camelCaseToString } from '../../utils/utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header:{
      fontSize:18,
  }
});

export default function BasicTable({table}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label="a dense table">
        <TableHead >
          <TableRow>
            {table&&table[0]&&Object.keys(table[0]).map((item,index) =>
                <TableCell key={index} className={classes.header}>{camelCaseToString(item)}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {table&&table.map((row,index) => (
            <TableRow key={index}>
                {Object.keys(table[0]).map((item,index) =>
                    <TableCell key={index}>{row[item]}</TableCell>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}