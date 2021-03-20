import React, {useState} from 'react'
import {Grid, TextField, Button, makeStyles, Typography, Paper} from '@material-ui/core'
import {setCurrentUser, setToken} from './actions'
import {useDispatch} from 'react-redux'
import leaves from './images/leaves.png'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
    form: {
        border: "2px solid #7e858d",
        width: "75%",
        borderRadius: "15px",
        textAlign: "center",
        marginLeft: "12%",
        backgroundColor: "white"
    },
    gridItem: {
        margin: "5%"
    },
    base: {
        textAlign: "center",
        backgroundImage: `url(${leaves})`,
        height: window.innerHeight,
        backgroundColor: "whitesmoke",
        backgroundSize: "100%"
    }
})
const Landing = () => {

    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)
    const [secondHover, setSecondHover] = useState(false)
    const classes = useStyles()
    const history = useHistory()

    const handleHover = (bool) => {
        setHover(bool)
    }

    const handleSecondHover = (bool) => {
        setSecondHover(bool)
    }

    const login = (ev) => {
        ev.preventDefault()

        const meta = {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({username: ev.target[0].value, password: ev.target[1].value})
        }

        fetch(`http://localhost:3000/login`, meta)
        .then(res => res.json())
        .then(data => {
          if(data.auth){
            localStorage.setItem("token", data.token)
            dispatch(setCurrentUser(data.user))
            dispatch(setToken(data.token))
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
          }
          else {
            alert(data.info)
          }
        })
    }


    
    return (
        <div className={classes.base}>
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant='overline' style={{fontSize: "26px"}} color="primary">
                        Evergreen
                    </Typography>
                </Grid>
                <Grid container direction="row" alignItems="center" style={{marginTop: "5%"}} spacing={3}>
                    <Grid item xs={1}>
                        
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.form} variant="elevation" elevation={!hover ? 3 : 20} onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
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
                                        autoComplete="off"
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
                <Grid item xs={5} >
                        <Paper className={classes.form} elevation={3} elevation={!secondHover ? 3 : 20} onMouseOver={() => handleSecondHover(true)} onMouseLeave={() => handleSecondHover(false)}>
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
                                        autoComplete="off"
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
                    <Grid item xs={1}>
                              
                    </Grid>
            </Grid>               
           </Grid>
        </div>
    )
}

export default Landing
