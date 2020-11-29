import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles, Paper, Typography} from '@material-ui/core'
import {setTransactions, setSelectedArr, setBankBalance} from './actions'
import { DataGrid } from '@material-ui/data-grid';
// import { XGrid } from '@material-ui/x-grid';

const useStyles = makeStyles({
    grid: {
        height: window.innerHeight / 1.4, 
        width: "100%"
    }
})

const Transactions = () => {

    const accounts = useSelector(state => state.accounts)
    const transactions = useSelector(state => state.transactions)
    const selectedArr = useSelector(state => state.selectedArr)
    const bankBalance = useSelector(state => state.bankBalance)
    // const transactionRows = useSelector(state => state.transactionRows)
    // const loading = useSelector(state => state.loading)

    const dispatch = useDispatch()

    const classes = useStyles()
   
    const width = 175
    const columns = [
        { field: 'id', headerName: 'ID', width: width },
        { field: 'Date', headerName: 'Date', width: width },
        { field: 'Description', headerName: 'Description', width: width },
        // { field: 'Category', headerName: 'Category', width: width },
        { field: 'Bank', headerName: 'Bank', width: width },
        { field: 'Type', headerName: 'Type', width: width },
        { 
        field: 'Value', 
        headerName: 'Value', 
        type: 'number',
        width: width
        }
        
    ];
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    const handleRowClick = (ev) => {
        // debugger
        if(ev.target){
            let newArr = selectedArr
            if(selectedArr.includes(ev.data)){
                newArr.remove(ev.data)
                dispatch(setSelectedArr(newArr))
            }
            else {
                newArr.push(ev.data)
                dispatch(setSelectedArr(newArr))
            }
        }
        else{
            let newArr = []
            ev.rowIds.forEach(id => {
                transactions.forEach(row => {
                    if(row.id === parseInt(id)){
                        newArr.push(row)
                    }
                })
            })
            dispatch(setSelectedArr(newArr))
        }
    }

    const transactionMap = () => {
        let i = 1
        let arr = []
        let balance = 0.00
        accounts.map((account) => {
          account.transactions.map((transaction) => {
              if(transaction.value < 0){
                  arr.push({id: (i++), Date: transaction.date, Description: transaction.description, Value: formatter.format(transaction.value), Bank: account.account.p_institution, Type: "Expense"})
              }
              else{
                  arr.push({id: (i++), Date: transaction.date, Description: transaction.description, Value: formatter.format(transaction.value), Bank: account.account.p_institution, Type: "Income"})
              }
              balance += transaction.value
          })
        })
        dispatch(setBankBalance(balance))
        return arr
    }
      
    const getTransactions = () => {
        const transactionRows = transactionMap()
        dispatch(setTransactions(transactionRows))
    }

    useEffect(() => {
        // getRows()
        getTransactions()
    }, [])

    return (
        <div className={classes.grid}>
            <Paper elevation={3} style={{textAlign: "center"}}>
                <Typography variant="overline" color="primary" >
                    My Balance: {formatter.format(bankBalance)}
                </Typography>
            </Paper>
            <DataGrid 
                rows={transactions} 
                columns={columns} 
                pageSize={25} 
                checkboxSelection 
                className={classes.dataGrid}
                onSelectionChange={(ev) => handleRowClick(ev)}
            />
        </div>
    )
}

export default Transactions
