import React, {useState} from 'react'
import {setNewBudgetType} from './actions'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { TextField, Select, Button} from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from 'react-router-dom';
import {setCurrentBudget} from './actions'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }, 
  grid: {
    margin: "2%"
  },
  gridItem: {
    textAlign: "center"
  },
  button: {
    fontSize: "11px",
    backgroundColor: "#00ca00",
    '&:hover': {
      backgroundColor: "#59dd44",
    },
  }
}));

const NewBudget = () => {
    const classes = useStyles()
    const budgetType = useSelector(state => state.newBudgetType)
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    const dispatch = useDispatch()

    const history = useHistory()

    function handleClick(budgetId) {
      localStorage.setItem("budgetId", budgetId)
      dispatch(setCurrentBudget(budgetId))
      history.push(`/viewPlan/${budgetId}`);
    }

    const addBudget = async (ev) => {
      ev.preventDefault()
  
      if(ev.target[0] === ""){
        alert("You must identify what type of plan you are creating")
      }
      else if(ev.target[1] === ""){
        alert("Please give a name for your financial plan")
      }
      else {
        const meta = {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({name: ev.target[1].value, type: ev.target[0].value, date_from: ev.target[2].value, date_to: ev.target[4].value})
        }
        const res = await fetch('http://localhost:3000/budgets', meta)
        const data = await res.json()
  
        handleClick(data.budget.id)
      }
    }

    return (
        <div>
          <form onSubmit={(ev) => addBudget(ev)}>
            <Grid className={classes.grid} container spacing={3} alignItems="center" direction="column">
              <Grid item xs={3}>
                <Grid container direction='column'>
                  <Grid item xs={12}>
                    <div>
                      Choose a plan option
                    </div>
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                  <Select
                    native
                    value={budgetType}
                    onChange={(ev) => {
                      dispatch(setNewBudgetType(ev.target.value))
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"simple"}>Simple Budget</option>
                    <option value={"plan"}>Planned Budget</option>
                    <option value={"full"}>Comprehensive plan</option>
                  </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
              <Grid container direction='column'>
                  <Grid item xs={12}>
                    <div>
                      Give the plan a name
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="standard-basic" label="Plan Name" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
              <Grid container spacing={2}direction='row'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Plan Start Date"
                      value={dateFrom}
                      onChange={setDateFrom}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Plan End Date"
                      value={dateTo}
                      onChange={setDateTo}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid item xs={3}>
              <Grid container direction='column'>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" className={classes.button}>
                      Create Plan
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
    )
}

export default NewBudget
