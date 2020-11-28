import React from 'react'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid'
import {makeStyles, TextField} from '@material-ui/core'
import {setStartDate} from './actions'
import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%"
    },
    base:{
      height: window.innerHeight,
      overflowX: "hidden"
    },
    paper: {
      width: 400,
    //   backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
      marginTop: "5%"
    },
    select: {
      color: "#102027",
    },
    label: {
      color: "#62727b"
    },
    icon: {
      color: "#66bb6a"
    },
  
  }));

const FullPlanForm = () => {
    
    const classes = useStyles()
    const startDate = useSelector(state => state.startDate)

    const dispatch = useDispatch()

    return (
        <Grid item xs={3}>
            <Grid container direction='column' alignItems="center">
                <Grid item xs={12}>
                <div>
                    Give the plan a name
                </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="standard-basic" label="Plan Name" color="primary" autoComplete="off" InputLabelProps={{
                        className: classes.label
                    }} inputProps={{
                        className: classes.select
                    }} />
                </Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Choose Start Date"
                            value={startDate}
                            onChange={(value) => dispatch(setStartDate(value))}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            className: classes.icon
                            }}
                            inputProps={{
                            className: classes.select
                            }}
                            InputLabelProps={{
                            className: classes.label
                            }}
                        /> 
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FullPlanForm
