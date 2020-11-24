import React from 'react'
import {Grid, TextField, Button, makeStyles, Typography, Paper} from '@material-ui/core'
import {setCurrentUser, setToken} from './actions'
import {useDispatch} from 'react-redux'
// import {useHistory} from 'react-router-dom'
const useStyles = makeStyles({
    form: {
        border: "2px solid #62727b",
        width: "75%",
        borderRadius: "15px",
        textAlign: "center",
        marginLeft: "12%",
        backgroundColor: "white"
    },
    gridItem: {
        margin: "5%"
    }
})
const Landing = () => {

    const dispatch = useDispatch()

    const classes = useStyles()
    // const history = useHistory()

    const login = (ev) => {
        ev.preventDefault()
        // debugger
        const meta = {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({username: ev.target[0].value, password: ev.target[1].value})
          }
        fetch(`http://localhost:3000/login`, meta)
        .then(res => res.json())
        .then(async (data) => {
          if(data.auth){
            localStorage.setItem("token", data.token)
            dispatch(setCurrentUser(data.user))
            dispatch(setToken(data.token))
            // history.push("/planList");
          }
          else {
            alert(data.info)
          }
        })
    }

    const signup = (ev) => {
        ev.preventDefault()
  
        const meta = {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({username: ev.target[0].value, password: ev.target[1].value}) 
        }
  
        fetch(`http://localhost:3000/users`, meta)
        .then(res => res.json())
        .then(async (data) => {
          if(data.auth){
            localStorage.setItem("token", data.token)
            dispatch(setCurrentUser(data.user))
            dispatch(setToken(data.token))
            // history.push("/planList");
          }
          else {
            alert(data.info)
          }
        })
    }
    
    return (
        <div style={{textAlign:"center"}}>
           <Grid container direction="row" alignItems="center" style={{marginTop: "10%"}} spacing={3}>
               <Grid item xs={5}>
                   <Paper className={classes.form} elevation={3}>
                        <form onSubmit={(ev) => {
                            login(ev)
                        }}>
                            <Grid container direct="column">
                                <Grid item xs={12}>
                                    <Typography variant="overline" color="primary" style={{fontSize: "16px"}}>
                                        Sign-in
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <TextField 
                                    placeholder="" 
                                    id="standard-basic" 
                                    label="Username"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <TextField 
                                    id="standard-password-input" 
                                    label="Password" 
                                    type="password" 
                                    autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Button variant="contained" type="submit" color="primary">
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
               </Grid>
               <Grid item xs={2}>
                    <div>OR</div>
               </Grid>
               <Grid item xs={5} >
                    <Paper className={classes.form} elevation={3}>
                        <form onSubmit={(ev) => {
                            signup(ev)
                        }}>
                            <Grid container direct="column">
                                <Grid item xs={12}>
                                    <Typography variant="overline" color="primary" style={{fontSize: "16px"}}>
                                        Create new account
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <TextField 
                                    placeholder="" 
                                    id="standard-basic" 
                                    label="Username"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <TextField 
                                    id="standard-password-input" 
                                    label="Password" 
                                    type="password" 
                                    autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Button variant="contained" type="submit" color="primary">
                                        SignUp
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
           </Grid>
        </div>
    )
}

export default Landing
