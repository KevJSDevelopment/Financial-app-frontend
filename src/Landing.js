import React from 'react'
import {Grid, TextField, Button} from '@material-ui/core'
import {setCurrentUser, setToken} from './actions'
import {useDispatch} from 'react-redux'
// import {useHistory} from 'react-router-dom'

const Landing = () => {

    const dispatch = useDispatch()

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
        <div>
           <Grid container direction="row" spacing={3}>
               <Grid item xs={6}>
                <form onSubmit={(ev) => {
                    login(ev)
                }}>
                    <Grid container direct="column">
                        <Grid item xs={12}>
                            <TextField 
                            placeholder="" 
                            id="standard-basic" 
                            label="Username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            id="standard-password-input" 
                            label="Password" 
                            type="password" 
                            autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
               </Grid>
               <Grid item xs={6}>
               <form onSubmit={(ev) => {
                    signup(ev)
                }}>
                    <Grid container direct="column">
                        <Grid item xs={12}>
                            <TextField 
                            placeholder="" 
                            id="standard-basic" 
                            label="Username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            id="standard-password-input" 
                            label="Password" 
                            type="password" 
                            autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">
                                SignUp
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                </Grid>
           </Grid>
        </div>
    )
}

export default Landing
