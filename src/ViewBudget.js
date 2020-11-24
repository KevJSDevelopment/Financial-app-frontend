import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SimpleBudget from './SimpleBudget'
import FullPlan from './FullPlan'
import {useSelector, useDispatch} from 'react-redux'
import {setCurrentBudget, setCurrentUser, setToken} from './actions'
import {Grid, Button, makeStyles} from '@material-ui/core'
// import {setCurrentUser, setToken} from './actions'
// import {useDispatch, useSelector} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


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

const ViewBudget = () => {

    const currentBudget = useSelector(state => state.currentBudget)
    const token = useSelector(state => state.token)

    const history = useHistory()
    const classes = useStyles()
    const dispatch = useDispatch()

    const getPlanType = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${localStorage.getItem("budgetId")}`)
        const data = await res.json()
        const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
        dispatch(setCurrentBudget(budgetObject))
    }

    const handleLogout = async () => {
        localStorage.removeItem("token")
        dispatch(setCurrentUser(null))
        dispatch(setToken(false))
    }

    const handleBackToBudgets = () => {
        history.push('/planList');
    }

    useEffect(() => {
        getPlanType()
    }, [])

    return (
        <div>
            <AppBar position="static" color="secondary" style={{height: window.innerHeight/20, minHeight: "50px"}} elevation={10}>
                <Toolbar>
                {token ? 
                    <Grid container direction="row" className={classes.nav} spacing={3}>
                    <Grid item xs={6}>
                        {currentBudget ? 
                        <Button variant="contained" onClick={handleBackToBudgets} style={{float: "left", fontSize: "10px", marginBottom: "2%"}} color="primary">Back to your plans</Button>:
                        <div></div>}
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={handleLogout} style={{float: "right", fontSize: "10px", marginBottom: "2%"}} color="primary">Logout</Button>
                    </Grid>
                    </Grid> : <div></div>}
                </Toolbar>
            </AppBar>
            {currentBudget ? 
            currentBudget.plan_type !== "simple" ? <SimpleBudget /> : <FullPlan />
            : <div></div>} 
        </div>
    )
}

export default ViewBudget
  
