import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { DataGrid } from '@material-ui/data-grid';
import {makeStyles, Typography, Paper, Grid, TextField, Select, Input, Button, InputAdornment, Radio, RadioGroup, FormControlLabel} from '@material-ui/core'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {setExpDate, setCategory} from './actions'

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

    const dispatch = useDispatch()
    const classes = useStyles()
    const width = 200
    const [expenseRows, setexpenseRows] = useState([])
    const [incomeRows, setincomeRows] = useState([])

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

    const getTransactions = () => {
        if(planView.expenseInfo){
            planView.expenseInfo.expenses.forEach(expense => {
                
            })
        }
        if(planView.incomeInfo){
            planView.incomeInfo.income.forEach(income => {

            })
        }
    }

    const handleAmountChange = () => {

    }
    
    const addNewExpense = () => {

    }

    const handleCategorySelect = (ev) => {
        dispatch(setCategory(ev.target.value))
    }

    const handleRowClick = () => {

    }

    useEffect(() => {
        getTransactions()
    }, [])
    return (
        <Grid container direction="row" spacing={3}>
            <Grid item xs={9}> 
                <div style={{ height: window.innerHeight / 1.4, width: "100%" }} className={classes.grid}>
                    <Paper elevation={3} autoCapitalize style={{marginBottom: "2%", textAlign: "center"}}>
                        <Typography variant="overline" color="primary" >
                            Expected Balance: ${planView.balance}
                        </Typography>
                    </Paper>
                    <div className={classes.dataContainer}>
                        <DataGrid 
                            rows={incomeRows} 
                            columns={expenseColumns} 
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
                </div>
            </Grid>
            <Grid item xs={3}>
                <form onSubmit={(ev) => addNewExpense(ev)}>
                    <Paper elevation={3} style={{borderRadius: "15px"}}>
                        <Grid container direction="column" spacing={1} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="overline" color="primary">
                                    Add New Transaction
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="income" control={<Radio color="primary" size="small" />} label="Income" />
                                    <FormControlLabel value="expense" control={<Radio color="primary" size="small" />} label="Expense" />
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
