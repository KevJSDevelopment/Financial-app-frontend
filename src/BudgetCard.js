import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setCurrentBudget} from './actions'
import {makeStyles, CardHeader, Paper} from '@material-ui/core'
import {ResponsivePie} from '@nivo/pie'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "white"
  },
  content: {
    '&:hover': {
      backgroundColor: "whitesmoke"
    },
    width: "90%", 
    marginLeft: "5%"
  },

}));

const BudgetCard = (props) => {

  const [dataArr, setDataArr] = useState([])

  const defaultCategories = [
    {"id":"1st category", "label": "1st category", "value": Math.ceil((Math.random() * 5)).toFixed(2)}, 
    {"id":"2nd", "label": "2nd", "value": Math.ceil((Math.random() * 5)).toFixed(2)},
    {"id":"3rd", "label": "3rd", "value": Math.ceil((Math.random() * 5)).toFixed(2)},
    {"id":"4th", "label": "4th", "value": Math.ceil((Math.random() * 5)).toFixed(2)},
    {"id":"5th", "label": "5th", "value": Math.ceil((Math.random() * 5)).toFixed(2)}
  ]

  // const defaultColors = ["paired", "nivo", "category10", "accent", "dark2", "pastel1", "pastel2", "set1", "set2", "set3"]
  const defaultColors = "greys"

  const history = useHistory()
  const classes = useStyles()

  const dispatch = useDispatch()

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const getData = () => {
    fetch(`http://localhost:3000/budgets/${props.budget.id}`)
    .then(res => res.json())
    .then(async (data) => {
        const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
        let newDataArr = []
        let total = 0
        budgetObject.expenseInfo.map(category => {
          let sum = 0
          category.expenses.forEach(expense => {
              sum += expense.cost
              total += expense.cost
          })
          const obj = {
              "id": category.cat.name,
              "label": category.cat.name,
              "value": sum.toFixed(2)
          }
          newDataArr.push(obj)
        })
        const meta = {
          method: "PATCH",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({total: total})
        }
        await fetch(`http://localhost:3000/budgets/${props.budget.id}`, meta)
        setDataArr(newDataArr)
    })
  }

  const handleClick = () => {
    localStorage.setItem("budgetId", props.budget.id)
    dispatch(setCurrentBudget(props.budget.id))
    history.push(`/viewPlan/${props.budget.id}`);
  }
  
  const handleDelete = async () => {
    await fetch(`http://localhost:3000/budgets/${props.budget.id}`, {method: "DELETE"})
    props.getBudgets()
  }

  useEffect(() => {
    getData()
  }, [])

    return (
      <Grid item xs={4}>
        <Card className={classes.root}>
          <CardHeader
            title={props.budget.name}
            subheader={props.budget.date_to}
            style={{color: '#338a3e'}}
          />
            <Paper className={classes.content}>
          <CardContent onClick={() => handleClick()}>
              {dataArr.length > 0 ?
              <div style={{height: "250px"}}>
              <ResponsivePie
                data={dataArr} 
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={.6}
                cornerRadius={5}
                colors={{ scheme: 'paired' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={5}
                radialLabelsTextColor="#102027"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={5}
                sliceLabelsTextColor="white"
              /> </div>: 
              <div style={{height: "250px"}}>
              <Typography>
                *Data will update with first entry*
              </Typography>
              <ResponsivePie
                data={defaultCategories} 
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={.6}
                cornerRadius={5}
                colors={{ scheme: defaultColors }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={5}
                radialLabelsTextColor="#102027"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={5}
                sliceLabelsTextColor="white"
              />
              </div>
              }
            
            <Typography variant="body2" color="textSecondary" component="p">
              From: {props.budget.date_from} To: {props.budget.date_to}
            </Typography>
            <Typography variant="subtitle2">
              {/* {props.budget.plan_type === "simple" && props.budget.total !== 0?  */}
              Expense Total: {formatter.format(-props.budget.total)}
              {/* : `Total: $${props.budget.total}`} */}
            </Typography>
          </CardContent>
          </Paper>
          <CardActions >
            <Button variant="contained" className={classes.view} onClick={() => handleClick()} size="small" color="primary">
              View
            </Button>
            <Button variant="contained" className={classes.delete} onClick={() => handleDelete()} size="small" color="secondary">
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
}

export default BudgetCard

