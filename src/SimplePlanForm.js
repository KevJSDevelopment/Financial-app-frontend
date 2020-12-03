import React from 'react'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid'
import {makeStyles, TextField} from '@material-ui/core'
import {setToDate, setFromDate} from './actions'
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
    backgroundColor: theme.palette.background.paper,
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
    color: "#7e858d"
  },
  icon: {
    color: "#aed581"
  },

}));

const SimplePlanForm = () => {
    const dateFrom = useSelector(state => state.fromDate)
    const dateTo = useSelector(state => state.toDate)
    const classes = useStyles()
    const dispatch = useDispatch()
    
    return (
        <div className={classes.root}>
            <Grid item xs={3} style={{marginLeft: "37.2%"}}>
                <Grid container direction='column' alignItems="center">
                    <Grid item xs={12}>
                    <div>
                        Give the plan a name
                    </div>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField autoComplete="off" id="standard-basic" label="Plan Name" color="primary" InputLabelProps={{
                        className: classes.label
                    }} inputProps={{
                        className: classes.select
                    }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3} style={{marginLeft:"37.5%"}}>
            <Grid container spacing={2} direction='row'>
      
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Plan Start Date"
                    value={dateFrom}
                    onChange={(value) => dispatch(setFromDate(value))}
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
                </Grid>
                <br/>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Plan End Date"
                    value={dateTo}
                    style={{fill:"white"}}
                    onChange={(value) => {
                      dispatch(setToDate(value))}}
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
                </Grid>
                </MuiPickersUtilsProvider>
                
              </Grid>
            </Grid>
        </div>
    )
}

export default SimplePlanForm
