import React, {useEffect} from 'react'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {ResponsivePie} from '@nivo/pie'
import {Grid, Select, TextField, Typography, Input, InputAdornment, Button, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {setCategoryList, setCategory, setDataArr, setAmount, setCurrentBudget, setExpDate, setTotal} from './actions'

const useStyles = makeStyles({
    button: {
      color: "white",
    //   backgroundColor: "#00ca00",
    //   '&:hover': {
    //     backgroundColor: "#59dd44",
    //   },
    },
    formItem: {
        marginBottom: "5%",
        textAlign: "center"
    },
    form: {
        width: "65%",
        textAlign: "left",
        border: "3px solid #7e858d",
        borderRadius: "15px",
        backgroundColor: "white"
    },
    total: {
        padding: "5px",
        border: "2px solid #7da453",
        backgroundColor: "white"
    }
    
});

const SimpleGraph = () => {
    const currentBudget = useSelector(state => state.currentBudget)
    const categoryList = useSelector(state => state.categoryList)
    const category = useSelector(state => state.category)
    const dataArr = useSelector(state => state.dataArr)
    const amount = useSelector(state => state.amount)
    const expDate = useSelector(state => state.expDate)
    const total = useSelector(state => state.total)


    const classes = useStyles()

    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const getData = () => {
        // debugger
        fetch(`http://localhost:3000/budgets/${localStorage.getItem("budgetId")}`)
        .then(res => res.json())
        .then(data => {
            const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
            let dataArr = []
            let catArr = []
            let total = 0
            budgetObject.expenseInfo.map(category => {
                let sum = 0
                category.expenses.forEach(expense => {
                    sum += expense.cost
                    total += expense.cost
                })
                const obj = {
                    "id": category.cat.name,
                    "label": category.cat.name,
                    "value": sum.toFixed(2)
                }
                catArr.push(category.cat)
                dataArr.push(obj)
            })
            dispatch(setTotal(total))
            dispatch(setCurrentBudget(budgetObject))
            dispatch(setCategoryList(catArr))
            dispatch(setDataArr(dataArr))
        })
    }
    
    const handleChange = (value) => {
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

    const getDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        const dateToString = mm + '/' + dd + '/' + yyyy;
        return dateToString
    }
    const handleSimpleSubmit = (ev) => {
        ev.preventDefault()

        if(ev.target[0].value.toLowerCase() === "new"){
            fetch("http://localhost:3000/expense_categories", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({name: ev.target[1].value})
            })
            .then(res => res.json())
            .then(categoryData => {
                if(categoryData.auth){
                    const cost = parseInt(ev.target[5].value)
                    fetch("http://localhost:3000/expenses", {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({
                            cost: cost,
                            description: ev.target[2].value,
                            date: getDate(expDate),
                            budget_id: currentBudget.budget.id,
                            expense_category_id: categoryData.expense_category.id
                        })
                    })
                    .then(res => res.json())
                    .then(expenseData => {
                        if(expenseData.auth){
                            // debugger
                            localStorage.setItem("budgetId", expenseData.expense.budget_id)
                            ev.target.reset()
                            dispatch(setAmount(""))
                            dispatch(setExpDate(new Date()))
                            getData()
                        }
                        else{
                            alert(expenseData.message)
                        }
                    })
                }
                else {
                    // debugger
                    alert(categoryData.message)
                }
            })
        }
        else {
            // debugger
            fetch("http://localhost:3000/expense_categories", {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({name: ev.target[0].value})
            })
            .then(res => res.json())
            .then(categoryData => {
                const cost = parseInt(ev.target[4].value)
                if(categoryData.auth){
                    fetch("http://localhost:3000/expenses", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({
                            cost: cost,
                            description: ev.target[1].value,
                            date: getDate(expDate),
                            budget_id: currentBudget.budget.id,
                            expense_category_id: categoryData.expense_category.id
                        })
                    })
                    .then(res => res.json())
                    .then(expenseData => {
                        localStorage.setItem("budgetId", expenseData.expense.budget_id)
                        ev.target.reset()
                        dispatch(setAmount(""))
                        dispatch(setExpDate(new Date()))
                        getData()
                    })
                }
                else {
                    alert(categoryData.message)
                }
            })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item xs={8}>
                    <Grid container direction="column">
                        <Grid item style={{height: "500px"}} xs={12}>
                            <ResponsivePie
                                data={dataArr}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={.6}
                                cornerRadius={5}
                                colors={{ scheme: 'paired' }}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                radialLabelsSkipAngle={5}
                                radialLabelsTextColor="#102027"
                                radialLabelsLinkColor={{ from: 'color' }}
                                sliceLabelsSkipAngle={5}
                                sliceLabelsTextColor="white"
                                isInteractive={true}
                                defs={[
                                    {
                                        id: 'dots',
                                        type: 'patternDots',
                                        background: 'inherit',
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        size: 4,
                                        padding: 1,
                                        stagger: true
                                    },
                                    {
                                        id: 'lines',
                                        type: 'patternLines',
                                        background: 'inherit',
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        rotation: -45,
                                        lineWidth: 6,
                                        spacing: 10
                                    }
                                ]}
                                fill={[
                                    {
                                        match: {
                                            id: 'ruby'
                                        },
                                        id: 'dots'
                                    },
                                    {
                                        match: {
                                            id: 'c'
                                        },
                                        id: 'dots'
                                    },
                                    {
                                        match: {
                                            id: 'go'
                                        },
                                        id: 'dots'
                                    },
                                    {
                                        match: {
                                            id: 'python'
                                        },
                                        id: 'dots'
                                    },
                                    {
                                        match: {
                                            id: 'scala'
                                        },
                                        id: 'lines'
                                    },
                                    {
                                        match: {
                                            id: 'lisp'
                                        },
                                        id: 'lines'
                                    },
                                    {
                                        match: {
                                            id: 'elixir'
                                        },
                                        id: 'lines'
                                    },
                                    {
                                        match: {
                                            id: 'javascript'
                                        },
                                        id: 'lines'
                                    }
                                ]}
                                legends={[
                                    {
                                        // isInteractive: true,
                                        anchor: 'bottom',
                                        direction: 'row',
                                        justify: false,
                                        translateX: 0,
                                        translateY: 56,
                                        itemsSpacing: 0,
                                        itemWidth: 100,
                                        itemHeight: 18,
                                        itemTextColor: '#102027',
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 1,
                                        symbolSize: 18,
                                        symbolShape: 'circle',
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemTextColor: '#102027'
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </Grid>
                        {total ? 
                        <Grid item xs={12} style={{textAlign: "center"}}>
                                <Typography variant="overline" className={classes.total}>
                                    Total: {formatter.format(total)}
                                </Typography>
                        </Grid>: <div></div>}
                    </Grid> 
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction="column" alignItems="center">
                        <Paper className={classes.form} elevation={10}>
                        <form onSubmit={(ev) => handleSimpleSubmit(ev)}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" style={{textAlign: "center", color: "#7da453"}}>
                                    Create new expense
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.formItem}>
                                <Select
                                    native
                                    value={category}
                                    onChange={(ev) => {
                                    dispatch(setCategory(ev.target.value))
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {categoryList.map(category => {
                                        return <option value={category.name} key={category.id}>{category.name}</option>
                                    })}
                                    <option value="New">+New Category</option>
                                </Select>
                            </Grid>
                            {category === "New" ?
                            <Grid item xs={12} className={classes.formItem}>
                                <TextField autoComplete="off" id="new-category" label="Category Name" defaultValue="" />
                            </Grid> : null}
                            <Grid item xs={12} className={classes.formItem}>
                                <TextField style={{width: "55%"}} autoComplete="off" id="new-category" label="Description" defaultValue="" />
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} className={classes.formItem}>
                                <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date"
                                value={expDate}
                                onChange={(value) => {
                                    // debugger
                                    dispatch(setExpDate(value))}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12} className={classes.formItem}>
                                <Input
                                    id="standard-adornment-amount"
                                    value={amount}
                                    onChange={(ev) => handleChange(ev.target.value)}
                                    style={{width: "30%"}} 
                                    placeholder="Amount"
                                    autoComplete="off"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.formItem} >
                                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                    Add Expense
                                </Button>
                            </Grid>
                        </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default SimpleGraph
