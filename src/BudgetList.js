import React from 'react'
import Grid from '@material-ui/core/Grid'
import BudgetCard from './BudgetCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const BudgetList = (props) => {
    // debugger
    return (
        <div>
            <Grid container alignItems="center" spacing={3}>
            {props.budgets.map(budget => {
                return  <BudgetCard viewBudget={props.viewBudget} budget={budget} classes={props.classes} key={budget.id}/>
            })}
            <Grid item xs={4}>
                <Fab onClick={() => props.handleBudget()}className={props.classes.icon} aria-label="add">
                <AddIcon />
                </Fab>
            </Grid>
        </Grid>
      </div>
    )
}

export default BudgetList
