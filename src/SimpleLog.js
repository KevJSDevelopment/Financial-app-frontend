import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentBudget, setSimpleRows, setSelectedArr, setCategory, setCategoryList, changeDisplayGraph} from './actions';
import { DataGrid } from '@material-ui/data-grid';
import { Select, Grid, TextField, Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        border: "2px solid #66bb6a",
        borderRadius: "5px",
        margin: "5px",
        padding: "5px",
    },
    dataGrid: {
        backgroundColor: "white",
    },
})
const SimpleLog = () => {
    
    const currentBudget = useSelector(state => state.currentBudget)
    const rows = useSelector(state => state.simpleTableRows)
    const categoryList = useSelector(state => state.categoryList)
    const category = useSelector(state => state.category)
    const selectedArr = useSelector(state => state.selectedArr)

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

    const handleCategorySelect = (ev) => {
        dispatch(setCategory(ev.target.value))
    }

    const handleCategoryChange = (ev) => {
        ev.preventDefault()
        if(ev.target[0].value !== "add"){
            fetch(`http://localhost:3000/expense_categories/${ev.target[0].value}`)
            .then(res => res.json())
            .then(data => {
                selectedArr.map(async(selectedObject) => {
                    const meta = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({expense_category_id: data.expense_category.id})
                    }
                    await fetch(`http://localhost:3000/expenses/${selectedObject.id}`, meta)
                    getExpenses()
                })
            })
        }
        else {
            const meta = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: ev.target[1].value})
            }
            fetch("http://localhost:3000/expense_categories", meta)
            .then(res => res.json())
            .then(data => {
                selectedArr.map(async (selectedObject) => {
                    const newMeta = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({expense_category_id: data.expense_category.id})
                    }
                    await fetch(`http://localhost:3000/expenses/${selectedObject.id}`, newMeta)
                    getExpenses()
                })
            })
        }
        ev.target.reset()
    }

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <div style={{ height: window.innerHeight / 1.35, width: "100%" }} className={classes.grid}>
            <Grid container direction="row" spacing={3} >
                <Grid item xs={6}>
                    <div></div>
                </Grid>
                <Grid item xs={6}>
                    <form onSubmit={(ev) => handleCategoryChange(ev)} className={classes.form}>
                        <Grid container direction="row" >
                            <Grid item xs={4}>
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
                                <TextField />
                            </Grid> : 
                            <Grid item xs={4}>
                                <TextField disabled/>
                            </Grid>
                            }
                            <Grid item xs={4}>
                                <Button variant="outlined" type="submit" color="primary">
                                    Submit Change
                                </Button>
                            </Grid> 
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={25} 
                checkboxSelection 
                className={classes.dataGrid}
                onRowClick={(ev) => handleRowClick(ev)}
            />
        </div>
    )
}

export default SimpleLog
