import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { setCurrentBudget, setSimpleRows} from './actions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const SimpleLog = () => {
    
    const currentBudget = useSelector(state => state.currentBudget)
    const rows = useSelector(state => state.simpleTableRows)
    const dispatch = useDispatch()

    function createData(date, description, value, category) {
      return { date, description, value, category };
    }
    
    
    const classes = useStyles()

    const getExpenses = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${localStorage.getItem("budgetId")}`)
        const data = await res.json()
        const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
        let tableRows = []
        await dispatch(setCurrentBudget(budgetObject))
        currentBudget.expenseInfo.map(category => {
            category.expenses.forEach(expense => {
                tableRows.push(createData(expense.date, expense.description, expense.cost.toFixed(2), category.cat.name))
            });
        })
        dispatch(setSimpleRows(tableRows)) 
    }

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date(mm/dd/yyy)</TableCell>
              <TableCell align="right">Description&nbsp;</TableCell>
              <TableCell align="right">Value&nbsp;($)</TableCell>
              <TableCell align="right">Category&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SimpleLog
