import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux'

import NewBudget from './NewBudget'
import BudgetList from './BudgetList'
import ViewBudget from './ViewBudget';

// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const open = useSelector(state => state.budgetOpen)

  return (
    <Router>
      {/* <Navbar /> */}
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => !open ? <BudgetList/> : <Redirect to="/newPlan"/>}/> 
          <Route path="/newPlan" exact render={() => open ? <NewBudget /> : <Redirect to="/" />}/>
          <Route path="/viewPlan/:id" exact render={() => <ViewBudget />}/> 
          <Redirect to="/"/>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
