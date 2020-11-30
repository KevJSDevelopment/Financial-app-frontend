import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import NewBudget from './NewBudget'
import BudgetList from './BudgetList'
import ViewBudget from './ViewBudget';
import Landing from './Landing';
import Link from './Link'
import {setToken} from './actions'
import {makeStyles} from '@material-ui/core';
import MyAppBar from './MyAppBar'
import FullPlanList from './FullPlanList';
import TabsContainer from './TabsContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    backgroundColor: "whitesmoke",
    height: window.innerHeight
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const open = useSelector(state => state.budgetOpen)
  const token = useSelector(state => state.token)
  const currentUser = useSelector(state => state.currentUser)
  // const accounts = useSelector(state => state.accounts)
  // const currentBudget = useSelector(state => state.currentBudget)
  const dispatch = useDispatch()

  const classes = useStyles()
  // const history = useHistory()
  
  const getToken = () => {
    dispatch(setToken(localStorage.getItem("token")))
  }

  useEffect(() => {
    getToken()
  }, [currentUser])

  return (
    <div className={classes.root}>
      <div id="content-container">
      <Router>
        {!open ? <MyAppBar />: null}
        {!open && token ? <TabsContainer /> : null}
        <Switch>
          <Route path="/" exact render={() => !token ? <Landing /> : <Redirect to="/planList"/> }/>
          <Route path="/planList" exact render={() => !!token ? <BudgetList/> : <Redirect to="/" />}/> 
          <Route path="/fullPlanList" exact render={() => !!token ? <FullPlanList /> : <Redirect to="/" />}/>
          <Route path="/newPlan" exact render={() => !!token ? <NewBudget /> : <Redirect to="/" />}/>
          <Route path="/viewPlan/:id" exact render={() => !!token ? <ViewBudget /> : <Redirect to="/" />}/> 
          <Route path="/link" exact render={() => !!token ? <Link /> : <Redirect to="/" />} />
          <Redirect to="/"/>
        </Switch>
      </Router>
      </div>
    </div> 
  )
}

export default App;
