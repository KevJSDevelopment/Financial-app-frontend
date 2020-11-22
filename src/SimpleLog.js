import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { setCurrentBudget, setSimpleRows, setSelectedArr, setCategory, setCategoryList, changeDisplayGraph} from './actions';
import { DataGrid } from '@material-ui/data-grid';
import { alignBox } from '@nivo/core';
import { Select, Grid, TextField, Button} from '@material-ui/core';
import { simpleTableRows } from './reducers/budgets';

const SimpleLog = () => {
    
    const currentBudget = useSelector(state => state.currentBudget)
    const rows = useSelector(state => state.simpleTableRows)
    const categoryList = useSelector(state => state.categoryList)
    const category = useSelector(state => state.category)
    const selectedArr = useSelector(state => state.selectedArr)
    const displayGraph = useSelector(state => state.displayGraph)
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

    const width = window.innerWidth / 5
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
                tableRows.push({id: expense.id, Date: expense.date, Description: expense.description, Cost: expense.cost.toFixed(2), Category: category.cat.name})
            });
        })
        dispatch(setCurrentBudget(budgetObject))
        dispatch(setCategoryList(catArr))
        dispatch(setSimpleRows(tableRows)) 
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
        // debugger
        dispatch(setCategory(ev.target.value))
    }

    const handleCategoryChange = (ev) => {
        ev.preventDefault()
        if(ev.target[0].value !== "add"){
            selectedArr.map(async (selectedObject) => {
                console.log(selectedObject)
                const meta = {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({expense_category_id: ev.target[0].value})
                }
                const res = await fetch(`http://localhost:3000/expenses/${selectedObject.id}`, meta)
                const data = await res.json()
                let tableRows = []
                let catArr = []
                currentBudget.expenseInfo.map(category => {
                    catArr.push(category.cat)
                    category.expenses.forEach(expense => {
                        tableRows.push({id: expense.id, Date: expense.date, Description: expense.description, Cost: expense.cost.toFixed(2), Category: category.cat.name})
                    });
                })
                dispatch(setCategoryList(catArr))
                dispatch(setSimpleRows(tableRows)) 
                dispatch(changeDisplayGraph(false))
            })
        }
        else {
            selectedArr.map(async (selectedObject) => {
                const meta = {
                    method: "PATCH",
                    headers: {"Content-Type": "application.json"},
                    body: JSON.stringify({expense_category_id: ev.target[1].value})
                }
                const res = await fetch(`http://localhost:3000/expenses/${selectedObject.id}`, meta)
                const data = await res.json()
                let tableRows = []
                let catArr = []
                currentBudget.expenseInfo.map(category => {
                    catArr.push(category.cat)
                    category.expenses.forEach(expense => {
                        tableRows.push({id: expense.id, Date: expense.date, Description: expense.description, Cost: expense.cost.toFixed(2), Category: category.cat.name})
                    });
                })
                dispatch(setCategoryList(catArr))
                dispatch(setSimpleRows(tableRows))
                dispatch(changeDisplayGraph(false))
            })
        }
    }

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <div style={{ height: window.innerHeight / 1.15, width: "100%" }}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={6}>
                    <div></div>
                </Grid>
                <Grid item xs={6}>
                    <form style={{width: "100%"}} onSubmit={(ev) => handleCategoryChange(ev)}>
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
                            </Grid> : null
                            }
                            <Grid item xs={4}>
                                <Button type="submit">
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
            onRowClick={(ev) => handleRowClick(ev)} 
            />
        </div>
    )
}

export default SimpleLog
