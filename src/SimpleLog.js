import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentBudget, setSimpleRows, setSelectedArr, setCategory, setCategoryList, setAmount, setExpDate} from './actions';
import { DataGrid } from '@material-ui/data-grid';
import { Select, Grid, TextField, Button, makeStyles, Paper, Input, InputAdornment, Typography} from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { currentBudget } from './reducers/budgets';
// import { simpleTableRows } from './reducers/budgets';

const useStyles = makeStyles({
    form: {
        border: "2px solid #62727b",
        borderRadius: "5px",
        margin: "5px",
        padding: "5px",
    },
    dataGrid: {
        backgroundColor: "white",
    },
    datePicker: {
        margin: 0
    }
})
const SimpleLog = () => {
    
    const currentBudget = useSelector(state => state.currentBudget)
    const rows = useSelector(state => state.simpleTableRows)
    const categoryList = useSelector(state => state.categoryList)
    const category = useSelector(state => state.category)
    const selectedArr = useSelector(state => state.selectedArr)
    const amount = useSelector(state => state.amount)
    const expDate = useSelector(state => state.expDate)

    const classes = useStyles()
    const dispatch = useDispatch()

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

    const container = document.querySelector("#content-container")
    const width = container.scrollWidth / 5
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
        let catArr = []
        budgetObject.expenseInfo.map(category => {
            catArr.push(category.cat)
            category.expenses.forEach(expense => {
                tableRows.push({id: expense.id, Date: expense.date, Description: expense.description, Cost: (expense.cost * -1.00).toFixed(2), Category: category.cat.name})
            });
        })
        dispatch(setCurrentBudget(budgetObject))
        dispatch(setCategoryList(catArr))
        dispatch(setSimpleRows(tableRows))
        dispatch(setSelectedArr([]))
        // debugger
    }

    const handleRowClick = (ev) => {
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
                rows.forEach(row => {
                    if(row.id === parseInt(id)){
                        newArr.push(row)
                    }
                })
            })
            dispatch(setSelectedArr(newArr))
        }
    }

    const handleCategorySelect = (ev) => {
        dispatch(setCategory(ev.target.value))
    }

    const handleCategoryChange = async (ev) => {
        ev.preventDefault()
        if(ev.target[0].value !== "add"){
            const res = await fetch(`http://localhost:3000/expense_categories/${ev.target[0].value}`)
            const data = await res.json()
            selectedArr.map(async(selectedObject) => {
                const meta = {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({expense_category_id: data.expense_category.id})
                }
                await fetch(`http://localhost:3000/expenses/${selectedObject.id}`, meta)
                getExpenses()
            })
        }
        else {
            const meta = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: ev.target[1].value})
            }
            const res = await fetch("http://localhost:3000/expense_categories", meta)
            const data = await res.json()
            selectedArr.map(async (selectedObject) => {
                const newMeta = {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({expense_category_id: data.expense_category.id})
                }
                await fetch(`http://localhost:3000/expenses/${selectedObject.id}`, newMeta)
                getExpenses()
            })
        }
        ev.target.reset()
    }

    const addNewExpense = async (ev) => {
        ev.preventDefault()

        if(ev.target[0].value !== "add"){
            // debugger
            const meta = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({description: ev.target[2].value, date: ev.target[3].value, cost: parseFloat(ev.target[5].value), expense_category_id: parseInt(ev.target[0].value), budget_id: currentBudget.budget.id})
            }
            const res = await fetch(`http://localhost:3000/expenses`, meta)
            const data = await res.json()
            if(data.auth){
                getExpenses()
            }
            else{
                alert(data.message)
            }
        }
        else {
            // debugger
            const meta = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: ev.target[1].value})
            }
            const res = await fetch(`http://localhost:3000/expense_categories`, meta)
            const data = await res.json()
            const newMeta = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({description: ev.target[2].value, date: ev.target[3].value, cost: parseFloat(ev.target[5].value), expense_category_id: data.expense_category.id, budget_id: currentBudget.budget.id})
            }
            const resp = await fetch(`http://localhost:3000/expenses`, newMeta)
            const newData = await resp.json()
            if(newData.auth){
                getExpenses()
            }
            else{
                alert(newData.message)
            }
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
    };

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <div style={{ height: window.innerHeight / 1.4, width: "100%" }} className={classes.grid}>
            <Grid container direction="row">
                <Grid item xs={8}>
                    <Paper className={classes.form}>
                        <form onSubmit={(ev) => addNewExpense(ev)}>
                            <Grid container direction="row" spacing={2} >
                                <Grid item xs={2}>
                                    <Typography variant="overline" color="primary">
                                        Add New Expense
                                    </Typography>
                                    <br/>
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
                                <Grid item xs={2}>
                                    <br/>
                                    <TextField
                                    id="standard-password-input"
                                    label="Category Name"
                                    autoComplete={false}
                                    />
                                </Grid> : 
                                <Grid item xs={2}>
                                    <br/>
                                    <TextField
                                    id="standard-password-input"
                                    label="Category Name"
                                    disabled
                                    />
                                </Grid>
                                }
                                <Grid item xs={2}>
                                    <br/>
                                    <TextField
                                    id="standard-password-input"
                                    label="Description"
                                    autoComplete={false}
                                    />
                                </Grid>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={2}>
                                    <br/>
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
                                <Grid item xs={2}>
                                    <br/>
                                    <br/>
                                    <Input
                                        id="standard-adornment-amount"
                                        value={amount}
                                        onChange={(ev) => handleAmountChange(ev.target.value)}
                                        style={{width: "100%"}} 
                                        placeholder="Amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <br/>
                                    <br/>
                                    <Button variant="contained" type="submit" color="primary" style={{fontSize: "9px"}}>
                                        Add Expense
                                    </Button>
                                </Grid> 
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.form}>
                        <form onSubmit={(ev) => handleCategoryChange(ev)}>
                            <Grid container direction="row" spacing={2} style={{paddingBottom: "1.5px"}}>
                                <Grid item xs={4}>
                                    <Typography variant="overline" color="primary">
                                        Edit Category
                                    </Typography>
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
                                <Grid item xs={4}>
                                    <br/>
                                    <TextField
                                    id="standard-password-input"
                                    label="Category Name"
                                    />
                                </Grid> : 
                                <Grid item xs={4}>
                                    <br/>
                                    <TextField
                                    id="standard-password-input"
                                    label="Category Name"
                                    autoComplete={false}
                                    disabled
                                    />
                                </Grid>
                                }
                                <Grid item xs={4}>
                                    <br/>
                                    <br/>
                                    <Button variant="contained" type="submit" color="primary" style={{fontSize: "9px"}}>
                                        Change Category
                                    </Button>
                                </Grid> 
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={25} 
                checkboxSelection 
                className={classes.dataGrid}
                onSelectionChange={(ev) => handleRowClick(ev)}
            />
        </div>
    )
}

export default SimpleLog
