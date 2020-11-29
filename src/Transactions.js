import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core'
import {setTransactions, setSelectedArr, setLoading} from './actions'
import { DataGrid } from '@material-ui/data-grid';

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
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()

    const classes = useStyles()
   
    const width = 150
    const columns = [
        { field: 'id', headerName: 'ID', width: width },
        { field: 'Date', headerName: 'Date', width: width },
        { field: 'Description', headerName: 'Description', width: width },
        { field: 'Category', headerName: 'Category', width: width },
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

    const getTransactions = () => {
        dispatch(setLoading(true))
        let i = 1
        let transactionRows = []
        accounts.forEach((account) => {
            fetch("http://localhost:3000/transactions",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({plaid_account_id: account.id})
            })
            .then(res => res.json())
            .then(data => {
                if(data.auth){
                    data.transactions.forEach((transaction) => {
                        fetch(`http://localhost:3000/transaction_categories/${transaction.transaction_category_id}`)
                        .then(resp => resp.json())
                        .then(categoryData => {
                            if(categoryData.auth){
                                if(transaction.value < 0){
                                    transactionRows.push({id: (i++), Date: transaction.date, Description: transaction.description, Category: categoryData.transaction_category.name, Value: formatter.format(transaction.value), Bank: account.p_institution, Type: "Expense"})
                                }
                                else{
                                    transactionRows.push({id: (i++), Date: transaction.date, Description: transaction.description, Category: categoryData.transaction_category.name, Value: formatter.format(transaction.value), Bank: account.p_institution, Type: "Income"})
                                }
                            }
                            else{
                                alert(categoryData.message)
                            }
                        })
                    })
                }
                else{
                    alert(data.message)
                }
            })
        })
        dispatch(setTransactions(transactionRows))
        dispatch(setLoading(false))
    }

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
        debugger
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

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <div className={classes.grid}>
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
