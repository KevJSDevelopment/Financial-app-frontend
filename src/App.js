import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import NewBudget from './NewBudget'
import BudgetList from './BudgetList'
import ViewBudget from './ViewBudget';
import Landing from './Landing';
import {setToken, setCurrentUser} from './actions'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const open = useSelector(state => state.budgetOpen)
  const token = useSelector(state => state.token)
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const classes = useStyles()

  const handleLogout = async () => {
      localStorage.removeItem("token")
      dispatch(setCurrentUser(null))
      dispatch(setToken(false))
    // history.push("/planList");
  }
  
  const getToken = () => {
    dispatch(setToken(localStorage.getItem("token")))
  }

  useEffect(() => {
    getToken()
  }, [currentUser])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" style={{height: window.innerHeight/20}}>
        <Toolbar>
          {token ? 
            <Grid container direction="row" className={classes.nav} spacing={3}>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={handleLogout} style={{float: "right", fontSize: "10px", marginBottom: "2%"}} color="primary">Logout</Button>
              </Grid>
            </Grid> : <div></div>}
        </Toolbar>
      </AppBar>
      <div id="content-container">
      <Router>
        <Switch>
          <Route path="/" exact render={() => !token ? <Landing /> : <Redirect to="/planList"/> }/>
          <Route path="/planList" exact render={() => !!token ? !open ? <BudgetList/> : <Redirect to="/newPlan"/> : <Redirect to="/" />}/> 
          <Route path="/newPlan" exact render={() => !!open ? <NewBudget /> : <Redirect to="/" />}/>
          <Route path="/viewPlan/:id" exact render={() => !!token ? <ViewBudget /> : <Redirect to="/" />}/> 
          <Redirect to="/"/>
        </Switch>
      </Router>
      </div>
    </div> 
  )
}

export default App;
