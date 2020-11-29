import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { DataGrid } from '@material-ui/data-grid';
import {makeStyles, Typography, Paper, Grid, TextField, Select, Input, Button, InputAdornment, Radio, RadioGroup, FormControlLabel} from '@material-ui/core'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {setExpDate, setCategory, setAmount, setExpenseRows, setIncomeRows, setCategoryList, setIncomeCategories, setExpenseCategories} from './actions'

const useStyles = makeStyles({
    dataGrid: {
        backgroundColor: "white",
    },
    dataContainer: {
        height: window.innerHeight / 2.3, 
        width: "100%", 
        marginBottom: "2%"
    }
})

const ViewPlan = () => {
    const planView = useSelector(state => state.planView)
    const categoryList = useSelector(state => state.categoryList)
    const category = useSelector(state => state.category)
    const amount = useSelector(state => state.amount)
    const expDate = useSelector(state => state.expDate)
    const expenseRows = useSelector(state => state.expenseRows)
    const incomeRows = useSelector(state => state.incomeRows)
    const incomeCategories = useSelector(state => state.incomeCategories)
    const expenseCategories = useSelector(state => state.expenseCategories)
    const [balance, setBalance] = useState(0.00)
    const dispatch = useDispatch()
    const classes = useStyles()
    const width = 150


    const expenseColumns = [
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
    const incomeColumns = [
        { field: 'id', headerName: 'ID', width: width },
        { field: 'Date', headerName: 'Date', width: width },
        { field: 'Description', headerName: 'Description', width: width },
        { 
        field: 'Value', 
        headerName: 'Value', 
        type: 'number',
        width: width
        },
        {
        field: 'Category',
        headerName: 'Category',
        width: width,
        }
    ];

    const getTransactions = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${planView.budget.id}`)
        const data = await res.json()
        let expenseSum = 0.00
        let incomeSum = 0.00
        if(data.expenseInfo.length > 0){
            let catArr = []
            let rows = []
            let i = 1
            data.expenseInfo.forEach(category => {
                category.expenses.forEach(expense => {
                    expenseSum += expense.cost
                    rows.push({id: i, Date: expense.date, Description: expense.description, Cost: formatter.format(expense.cost * -1), Category: category.cat.name})
                    i++
                })
                catArr.push(category.cat)
            })
            dispatch(setExpenseRows(rows))
            dispatch(setExpenseCategories(catArr))
        }
        if(data.incomeInfo.length > 0){
            let rows = []
            let catArr = []
            let i = 1
            data.incomeInfo.forEach(category => {
                category.incomes.forEach(income=> {
                    incomeSum += income.value
                    rows.push({id: i, Date: income.date, Description: income.description, Value: formatter.format(income.value), Category: category.cat.name})
                    i++
                })
                catArr.push(category.cat)
            })
            setBalance(incomeSum - expenseSum)
            dispatch(setIncomeRows(rows))
            dispatch(setIncomeCategories(catArr))
        }
    }

    const handleAmountChange = (value) => {
        const num = parseFloat(value)
        
        if(isNaN(num) && value !== ""){
            // debugger
            alert("You must enter a number for the cost")
        }
        else if (value === ""){
            dispatch(setAmount(value))
        }
        else{
            dispatch(setAmount(num))
        }
    }
    
    const addNewTransaction = async (ev) => {
        ev.preventDefault()
        if(ev.target[0].checked){
            if(category !== "add"){
                const res = await fetch("http://localhost:3000/incomes", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({value: ev.target[7].value, description: ev.target[4].value, date: ev.target[5].value, budget_id: planView.budget.id, income_category_id: ev.target[2].value })
                })
                const data = await res.json()
                if(data.auth){
                    getTransactions()
                    ev.target.reset()
                }
                else{
                    alert(data.message)
                }
            }
            else{
                const res = await fetch("http://localhost:3000/income_categories", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({name: ev.target[3].value })
                })
                const data = await res.json()
                const resp = await fetch("http://localhost:3000/incomes", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({value: ev.target[7].value, description: ev.target[4].value, date: ev.target[5].value, budget_id: planView.budget.id, income_category_id: data.income_category.id })
                })
                const newData = await resp.json()
                if(newData.auth){
                    getTransactions()
                    ev.target.reset()
                }
                else{
                    alert(data.message)
                }
            }
        }
        else if(ev.target[1].checked){
            if(category !== "add"){
                const res = await fetch("http://localhost:3000/expenses", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({value: ev.target[7].value, description: ev.target[4].value, date: ev.target[5].value, budget_id: planView.budget.id, expense_category_id: ev.target[2].value })
                })
                const data = await res.json()
                if(data.auth){
                    getTransactions()
                    ev.target.reset()
                }
                else{
                    alert(data.message)
                }
            }
            else{
                const res = await fetch("http://localhost:3000/expense_categories", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({name: ev.target[3].value })
                })
                const data = await res.json()
                const resp = await fetch("http://localhost:3000/expenses", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({cost: ev.target[7].value, description: ev.target[4].value, date: ev.target[5].value, budget_id: planView.budget.id, expense_category_id: data.expense_category.id })
                })
                const newData = await resp.json()
                if(data.auth){
                    getTransactions()
                    ev.target.reset()
                }
                else{
                    alert(data.message)
                }
            }
        }
        else {
            alert("You must choose either income or expense when adding a transaction")
        }
        // debugger
    }

    const handleCategorySelect = (ev) => {
        dispatch(setCategory(ev.target.value))
    }

    const handleRowClick = () => {

    }

    const radioClick = (ev) => {
        console.log(ev.target.checked)
        if(ev.target.checked){
           if(ev.target.value === "income"){
                dispatch(setCategoryList(incomeCategories))
            }
            else{
                dispatch(setCategoryList(expenseCategories))
            }
        }
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <Grid container direction="row" spacing={3}>
            <Grid item xs={9}> 
                <Paper elevation={3} autoCapitalize style={{marginBottom: "2%", textAlign: "center"}}>
                    <Typography variant="overline" color="primary" >
                        Expected Balance:
                        <Typography variant="overline" color="secondary">
                            {formatter.format(balance)}
                        </Typography>
                    </Typography>
                </Paper>
                 <div className={classes.dataContainer}>
                    <DataGrid 
                        rows={incomeRows} 
                        columns={incomeColumns} 
                        pageSize={25} 
                        checkboxSelection 
                        className={classes.dataGrid}
                        onSelectionChange={(ev) => handleRowClick(ev)}
                    />
                </div>
                <div className={classes.dataContainer}>
                    <DataGrid 
                        rows={expenseRows} 
                        columns={expenseColumns} 
                        pageSize={25} 
                        checkboxSelection 
                        className={classes.dataGrid}
                        onSelectionChange={(ev) => handleRowClick(ev)}
                    />
                </div>
            </Grid>
            <Grid item xs={3}>
                <form onSubmit={(ev) => addNewTransaction(ev)}>
                    <Paper elevation={3} style={{borderRadius: "15px"}}>
                        <Grid container direction="column" spacing={1} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="overline" color="primary">
                                    Add New Transaction
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="income" control={<Radio onClick={(ev) => radioClick(ev)} color="primary" size="small" />} label="Income" />
                                    <FormControlLabel value="expense" control={<Radio onClick={(ev) => radioClick(ev)} color="primary" size="small" />} label="Expense" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    native
                                    value={category}
                                    onChange={(ev) => {
                                        handleCategorySelect(ev)
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {categoryList.map(catObj=> {
                                        return <option value={catObj.id} key={catObj.id}>{catObj.name}</option>
                                    })}
                                    <option value="add">Add Category</option>
                                </Select>
                            </Grid>
                            {category === "add" ? 
                            <Grid item xs={12}>
                                <TextField
                                id="standard-password-input"
                                label="Category Name"
                                autoComplete="off"
                                />
                            </Grid> : 
                            <Grid item xs={12}>
                                <TextField
                                id="standard-password-input"
                                label="Category Name"
                                autoComplete="off"
                                disabled
                                />
                            </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                id="standard-password-input"
                                label="Description"
                                autoComplete="off"
                                />
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    className={classes.datePicker}
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date"
                                    value={expDate}
                                    onChange={(value) => dispatch(setExpDate(value))}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12}>
                                <Input
                                    id="standard-adornment-amount"
                                    value={amount}
                                    onChange={(ev) => handleAmountChange(ev.target.value)}
                                    style={{width: "100%"}} 
                                    placeholder="Amount"
                                    autoComplete="off"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" color="primary" style={{fontSize: "9px"}}>
                                    Add Expense
                                </Button>
                            </Grid> 
                        </Grid>                      
                    </Paper>
                </form>
            </Grid>
        </Grid>
    )
}

export default ViewPlan
