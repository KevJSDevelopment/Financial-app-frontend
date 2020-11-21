import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { setCurrentBudget, setSimpleRows} from './actions';
import { DataGrid } from '@material-ui/data-grid';
import { alignBox } from '@nivo/core';
import { Select } from '@material-ui/core';

const SimpleLog = () => {
    
    const currentBudget = useSelector(state => state.currentBudget)
    const rows = useSelector(state => state.simpleTableRows)
    const dispatch = useDispatch()

    const width = 1420 / 5
    const columns = [
        { field: 'id', headerName: 'ID', width: width },
        { field: 'Date', headerName: 'Date', width: width },
        { field: 'Description', headerName: 'Description', width: width },
        { 
        field: 'Cost', 
        headerName: 'Cost', 
        type: 'number',
        width: width
        },
        {
        field: 'Category',
        headerName: 'Category',
        width: width,
        }
    ];

    const getExpenses = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${localStorage.getItem("budgetId")}`)
        const data = await res.json()
        const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
        let tableRows = []
        dispatch(setCurrentBudget(budgetObject))
        currentBudget.expenseInfo.map(category => {
            category.expenses.forEach(expense => {
                tableRows.push({id: expense.id, Date: expense.date, Description: expense.description, Cost: expense.cost.toFixed(2), Category: category.cat.name})
            });
        })
        dispatch(setSimpleRows(tableRows)) 
        // debugger
    }


    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <div style={{ height: window.innerHeight / 1.15, width: "100%" }}>
            <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                    {/*
                    - select rows from state, 
                    - map through rows to get all categories, 
                    - set select to equal unique categories, 
                    - on checkbox selection & selecting a category,
                    - set all checked items to that category 
                    */}
                </Grid>
                <Grid item xs={12}>
                    <DataGrid rows={rows} columns={columns} pageSize={25} checkboxSelection />
                </Grid>
            </Grid>
        </div>
    )
}

export default SimpleLog
