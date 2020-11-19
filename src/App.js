import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {setBudgets, openNewBudget, setCurrentBudget, isLoading} from './actions'
import NewBudget from './NewBudget'
import BudgetList from './BudgetList'
import ViewBudget from './ViewBudget';

// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const open = useSelector(state => state.budgetOpen)
  const currentBudget = useSelector(state => state.currentBudget)
  const loading = useSelector(state => state.loading)
  
  const dispatch = useDispatch()

  const getBudgets = async () => {
    const res = await fetch('http://localhost:3000/budgets')
    const data = await res.json()
    // debugger
    dispatch(setBudgets(data.budgets))
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

  const viewBudget = async (budgetId) => {
    const res = await fetch(`http://localhost:3000/budgets/${budgetId}`)
    const data = await res.json()
    dispatch(setCurrentBudget({ budget: data.budget, expenseInfo: data.expenseInfo}))
    localStorage.setItem("currentBudgetId", data.budget.id)
  }

  useEffect(() => {

    if(localStorage.getItem("currentBudgetId")){
      viewBudget(localStorage.getItem("currentBudgetId"))
    }
      getBudgets()
  }, [])

  return (
    <Router>
      {/* <Navbar /> */}
      {/* {!loading ?  */}
      <div className="App">
        {!currentBudget ? 
        <Switch>
          <Route path="/" exact render={() => !open ? <BudgetList/> : <Redirect to="/newPlan"/>}/> 
          <Route path="/newPlan" exact render={() => open ? <NewBudget open={open} addBudget={addBudget} /> : <Redirect to="/" />}/>
          <Redirect to="/" />
        </Switch> : 
        <Switch>
          <Route path="/viewPlan" render={() => <ViewBudget/>}/> 
          <Redirect to="/viewPlan" />
        </Switch>
        } 
      </div> 
      {/* : <div>Loading...</div>} */}
    </Router>
  );
}

export default App;
