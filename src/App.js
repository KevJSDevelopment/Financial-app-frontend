import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {setBudgets, openBudgetModal} from './actions'
import Grid from '@material-ui/core/Grid'
import BudgetCard from './BudgetCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewBudget from './NewBudget'

// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon: {
    color: "white",
    backgroundColor: "#00ca00",
    '&:hover': {
      backgroundColor: "#59dd44",
    },
    marginLeft: "30%"
  },
  
});

const App = () => {
  const classes = useStyles()
  const budgets = useSelector(state => state.budgets)
  const open = useSelector(state => state.budgetOpen)
  const dispatch = useDispatch()

  const getBudgets = async () => {
    const res = await fetch('http://localhost:3000/budgets')
    const data = await res.json()
    // debugger
    dispatch(setBudgets(data.budgets))
  }

  const handleBudgetModel = () => {
    dispatch(openBudgetModal())
  }

  const addBudget = async (event) => {
    const meta = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({})
    }
    const res = await fetch('http://localhost:3000/budgets', meta)
    const data = await res.json()
    console.log(data)
  }

  useEffect(() => {
      getBudgets()
  }, [])

  return (
    <div>
      {/* top container */}

      {/* budgets */}
      <Grid container alignItems="center" spacing={3}>
      {budgets.map(budget => {
        return  <Grid item xs={4}>
                  <BudgetCard budget={budget} classes={classes}/>
                </Grid>
      })}
        <Grid item xs={4}>
            <Fab onClick={() => handleBudgetModel()}className={classes.icon} aria-label="add">
              <AddIcon />
            </Fab>
        </Grid>
      </Grid>
      
      <NewBudget open={open} handleBudgetModel={handleBudgetModel}/>
    </div>
  );
}

export default App;
