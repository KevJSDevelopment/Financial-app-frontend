import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {setBudgets, openNewBudget, setCurrentBudget} from './actions'
import NewBudget from './NewBudget'
import BudgetList from './BudgetList'
import ViewBudget from './ViewBudget';

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
  const currentBudget = useSelector(state => state.currentBudget)
  // console.log(currentBudget)
  const dispatch = useDispatch()

  const getBudgets = async () => {
    const res = await fetch('http://localhost:3000/budgets')
    const data = await res.json()
    // debugger
    dispatch(setBudgets(data.budgets))
  }

  const handleBudget = () => {
    dispatch(openNewBudget())
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

      viewBudget(data.budget.id)
    }
  }

  const viewBudget = async(budgetId) => {
    const res = await fetch(`http://localhost:3000/budgets/${budgetId}`)
    const data = await res.json()
    dispatch(setCurrentBudget({ budget: data.budget, expenseInfo: data.expenseInfo}))
    localStorage.setItem("currentBudgetId", data.budget.id)
  }

  //temporary
  let i = 0
  useEffect(() => {

    //temporary to reload budgetlist on refresh
    if(i === 0){
      localStorage.removeItem("currentBudgetId")
      i++
    }

    if(localStorage.getItem("currentBudgetId")){
      viewBudget(localStorage.getItem("currentBudgetId"))
    }
      getBudgets()
  }, [])

  return (
    <Router>
      {/* <Navbar /> */}
      <div className="App">
        {!currentBudget ? 
        <Switch>
          <Route path="/" exact render={() => !open ? <BudgetList classes={classes} budgets={budgets} handleBudget={handleBudget} viewBudget={viewBudget}/> : <Redirect to="/newPlan"/>}/> 
          <Route path="/newPlan" exact render={() => open ? <NewBudget open={open} handleBudgetModel={handleBudget} addBudget={addBudget} /> : <Redirect to="/" />}/>
          <Redirect to="/" />
          {/* <Route path="/viewPlan" exact render={() => } */}
        </Switch> : 
        <Switch>
          <Route path="/viewPlan" render={() => <ViewBudget budget={currentBudget} />}/> 
          <Redirect to="/viewPlan" />
        </Switch>
        }
        
      </div>
    </Router>
  );
}

export default App;
