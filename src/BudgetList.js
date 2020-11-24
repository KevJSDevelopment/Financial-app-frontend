import React, {useEffect} from 'react'
// import {Grid, makeStyles} from '@material-ui/core'
import BudgetCard from './BudgetCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useSelector, useDispatch} from 'react-redux'
import {openNewBudget} from './actions'
// import {setBudgets} from './actions'
import {setCurrentUser, setToken, setBudgets} from './actions'
import {Grid, Button, makeStyles} from '@material-ui/core'
// import {setCurrentUser, setToken} from './actions'
// import {useDispatch, useSelector} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    icon: {
      marginLeft: "30%"
    },
    root: {
      backgroundColor: "whitesmoke"
    },
    container: {
      marginLeft: "3%"
    }
    
});

const BudgetList = () => {
    // debugger

    const classes = useStyles()
    const budgets = useSelector(state => state.budgets)
    // const currentBudget = useSelector(state => state.currentBudget)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()

    const getBudgets = async () => {
      const res = await fetch('http://localhost:3000/budgets', {
        headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
      })
      const data = await res.json()
      dispatch(setBudgets(data.budgets))
    }

    const handleLogout = async () => {
      localStorage.removeItem("token")
      dispatch(setCurrentUser(null))
      dispatch(setToken(false))
  }
  
    useEffect(() => {
      getBudgets()
    }, [])

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary" style={{height: window.innerHeight/20}} elevation={10}>
                <Toolbar>
                {token ? 
                    <Grid container direction="row" className={classes.nav} spacing={3}>
                      <Grid item xs={12}>
                          <Button variant="outlined" onClick={handleLogout} style={{float: "right", fontSize: "10px", marginBottom: "2%"}} color="primary">Logout</Button>
                      </Grid>
                    </Grid> : <div></div>}
                </Toolbar>
            </AppBar>
        <Grid container alignItems="center" spacing={3} className={classes.container}>
          {budgets.map(budget => {
              return <BudgetCard budget={budget} getBudgets={getBudgets} key={budget.id}/>
          })}
          <Grid item xs={4}>
              <Fab onClick={() => dispatch(openNewBudget())} className={classes.icon} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
          </Grid>
        </Grid>
      </div>
    )
}

export default BudgetList
