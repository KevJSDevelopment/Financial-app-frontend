import React, {useEffect} from 'react'
// import {Grid, makeStyles} from '@material-ui/core'
import BudgetCard from './BudgetCard'
import {useSelector, useDispatch} from 'react-redux'
import {setCurrentUser, setLink} from './actions'
// import {setBudgets} from './actions'
import {setBudgets, resetStore, setTransactions, setAccounts} from './actions'
import {Grid, makeStyles} from '@material-ui/core'
// import { transactions } from './reducers/categories'

const useStyles = makeStyles({
    icon: {
      marginLeft: "30%"
    },
    container: {
      marginLeft: "3%",
      marginTop:"2%"
    },
    root: {
      flexGrow: 1,
      maxWidth: "100%",
      borderRadius: "0 0 25px 25px",
      backgroundColor: "whitesmoke"
    },
    
});

const BudgetList = () => {
    // debugger

    const classes = useStyles()
    const budgets = useSelector(state => state.budgets)
    // const accounts = useSelector(state => state.accounts)
    // const transactions = useSelector(state => state.transactions)
    // const currentBudget = useSelector(state => state.currentBudget)

    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
  })

  const getBudgets = async () => {
    const res = await fetch('http://localhost:3000/budgets', {
      headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
    })
    const data = await res.json()
    dispatch(setBudgets(data.budgets))
  }

  const setUser = async () => {
    const res = await fetch('http://localhost:3000/users', {
      headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
    })
    const data = await res.json()
    dispatch(setCurrentUser(data.user))
    const resp = await fetch('http://localhost:3000/link', {
      headers: {"Content-Type": "application/json", "Authentication": `Bearer ${localStorage.getItem("token")}`},
    })
    const linkData = await resp.json()
    debugger
    if(linkData.auth){
      localStorage.setItem("link", linkData.link)
      dispatch(setLink(linkData.link))
    }
    else{
      alert(linkData.message)
    }
  }
  
  useEffect(() => {
    getBudgets()
    setUser()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={3} className={classes.container}>
        {budgets.map(budget => {
          if(budget.plan_type !== "full"){
            return <BudgetCard budget={budget} getBudgets={getBudgets} key={budget.id}/>
          }
        })}
      </Grid>
    </div>
  )
}

export default BudgetList
