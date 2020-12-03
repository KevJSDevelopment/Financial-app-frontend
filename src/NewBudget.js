import React, {useState} from 'react'
import {setNewBudgetType, resetStore} from './actions'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import {Select, Button, Paper} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {setCurrentBudget} from './actions'
import SimplePlanForm from './SimplePlanForm';
import FullPlanForm from './FullPlanForm'
import leaves from './images/leaves.png'
import Grow from '@material-ui/core/Grow'
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import {openNewBudget} from './actions'
// import TabsContainer from './TabsContainer'

const useStyles = makeStyles((theme) => ({
  base:{
    height: window.innerHeight /1.10,
    backgroundImage: `url(${leaves})`,
    width: "100%",
    overflowX: "hidden",
    backgroundPositionY: "155%"
  },
  paper: {
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  }, 
  formGrid: {
    marginTop: "2%",
    marginBottom: "2%"
  },
  gridItem: {
    textAlign: "center"
  },
  button: {
    fontSize: "11px"
  },
  form: {
    color: "#102027",
    border: "2px solid grey",
    backgroundColor: "white",
    width:"100%",
    marginTop: "5%",
    '&:hover':{
      transform: 'scale(1.05)'
    }
  },
  select: {
    color: "#102027",
  },
  label: {
    color: "#7e858d"
  },
  icon: {
    color: "#aed581"
  },

}));

const NewBudget = () => {
  const classes = useStyles()
  const budgetType = useSelector(state => state.newBudgetType)
  const dateFrom = useSelector(state => state.fromDate)
  const dateTo = useSelector(state => state.toDate)
  const startDate = useSelector(state => state.startDate)

  const [hover, setHover] = useState(false)
  // const token = useSelector(state => state.token)
  // const currentBudget = useSelector(state => state.currentBudget)

  const history = useHistory()
  const dispatch = useDispatch()


  const handleSimpleClick = (budgetId) => {
    localStorage.setItem("budgetId", budgetId)
    dispatch(setCurrentBudget(budgetId))
    history.push(`/viewPlan/${budgetId}`);
  }

  const handleFullClick = (budgetId) => {
    localStorage.setItem("budgetId", budgetId)
    dispatch(setCurrentBudget(budgetId))
    history.push(`/fullPlanList`);
  }

  const getDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const dateToString = mm + '/' + dd + '/' + yyyy;
    return dateToString
  }

  const addBudget = async (ev) => {
    ev.preventDefault()

    if(ev.target[0].value === ""){
      alert("You must identify what type of plan you are creating")
    }
    else if(ev.target[1].value === ""){
      alert("Please give a name for your financial plan")
    }
    else {
      if(ev.target[0].value === "simple"){
        const meta = {
          method: "POST",
          headers: {"Content-Type":"application/json",
                    "Authentication": `Bearer ${localStorage.getItem("token")}`},
          body: JSON.stringify({name: ev.target[1].value, type: ev.target[0].value, date_from: getDate(dateFrom), date_to: getDate(dateTo)})
        }
        const res = await fetch('http://localhost:3000/budgets', meta)
        const data = await res.json()
  
        handleSimpleClick(data.budget.id) 
      }
      else {
        let dateArr = getDate(startDate).split("/")
        let endDate = new Date()
        if((dateArr[0] - 0) !== 12){
          endDate = new Date((dateArr[2] - 0), (dateArr[0] - 0), (dateArr[1] - 0))
        }
        else{
          endDate = new Date((dateArr[2] - 0 + 1), 0, (dateArr[1] - 0))
        }
        // debugger
        const meta = {
          method: "POST",
          headers: {"Content-Type":"application/json",
                    "Authentication": `Bearer ${localStorage.getItem("token")}`},
          body: JSON.stringify({name: ev.target[1].value, type: ev.target[0].value, date_from: getDate(startDate), date_to: getDate(endDate)})
        }
        const res = await fetch('http://localhost:3000/budgets', meta)
        const data = await res.json()
        handleFullClick(data.budget.id) 
      }
    }
  }

  return (
    <div className={classes.base}>
      <Grow in={true} timeout={500}>
      <Paper className={classes.form} elevation={!hover ? 3 : 20} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <form onSubmit={(ev) => addBudget(ev)}>
          <Grid className={classes.formGrid} container spacing={3} alignItems="center" direction="column">
            <Grid item xs={3}>
              <div style={{fontSize:"22px", textAlign: "center", color: "#7da453"}}>
                Create New Financial Plan
              </div>
            </Grid>
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
                    color="primary"
                    className={classes.select}
                    onChange={(ev) => {
                      dispatch(setNewBudgetType(ev.target.value))
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"simple"}>Expense Tracker</option>
                    <option value={"full"}>Full financial plan</option>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            {budgetType === "simple" ? <SimplePlanForm /> : budgetType === "full" ? <FullPlanForm /> : null}
            <Grid item xs={3}>
            <Grid container direction='column'>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Create Plan
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      </Grow>
    </div>
  )
}

export default NewBudget
