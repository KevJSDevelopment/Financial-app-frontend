import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setCurrentBudget} from './actions'

const BudgetCard = (props) => {

  const dispatch = useDispatch()
  const history = useHistory()

  function handleClick() {
    localStorage.setItem("budgetId", props.budget.id)
    dispatch(setCurrentBudget(props.budget.id))
    history.push(`/viewPlan/${props.budget.id}`);
  }

    return (
      <Grid item xs={4}>
        <Card>
        <CardActionArea>
          <CardContent onClick={() => handleClick()}>
              <Typography gutterBottom variant="h5" component="h2">
                  {props.budget.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  From: {props.budget.date_from} To: {props.budget.date_to}
                </Typography>
                <Typography variant="h6" component="h6">
                  Net: ${props.budget.total}
                </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => handleClick()} size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
      </Grid>
    )
}

export default BudgetCard
