import React from 'react'
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
import {makeStyles, CardMedia, CardHeader} from '@material-ui/core'
import pie from './images/Pie.png'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "white"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const BudgetCard = (props) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const classes = useStyles()

  const handleClick = () => {
    localStorage.setItem("budgetId", props.budget.id)
    dispatch(setCurrentBudget(props.budget.id))
    history.push(`/viewPlan/${props.budget.id}`);
  }
  
  const handleDelete = async () => {
    await fetch(`http://localhost:3000/budgets/${props.budget.id}`, {method: "DELETE"})
    props.getBudgets()
  }

    return (
      <Grid item xs={4}>
        <Card className={classes.root}>
          <CardHeader
            title={props.budget.name}
            subheader={props.budget.date_to}
            style={{color: '#338a3e'}}
          />
          <CardMedia
            className={classes.media}
            image={pie}
            title="Chart"
          />
          <CardContent onClick={() => handleClick()}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      From: {props.budget.date_from} To: {props.budget.date_to}
                    </Typography>
                    <Typography variant="h6" component="h6">
                      Net: ${props.budget.total}
                    </Typography>
          </CardContent>
          <CardActions >
          <Button onClick={() => handleClick()} size="small" color="primary">
                View
              </Button>
              <Button onClick={() => handleDelete()} size="small" color="secondary">
                Delete
              </Button>
          </CardActions>
        </Card>
      </Grid>
    )
}

export default BudgetCard

