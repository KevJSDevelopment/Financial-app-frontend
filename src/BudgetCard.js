import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const BudgetCard = (props) => {
    return (
        <Card className={props.classes.root}>
        <CardActionArea>
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              {props.budget.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              From: {props.budget.date_from} To: {props.budget.date_to}
            </Typography>
            <Typography variant="h6" component="h6">
              Budget: ${props.budget.total}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    )
}

export default BudgetCard
