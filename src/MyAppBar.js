import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Grid, Button, makeStyles} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import Link from './Link'
import {useHistory} from 'react-router-dom'
import {resetStore} from './actions'

const MyAppBar = () => {

    const currentUser = useSelector(state => state.currentUser)
    const token = useSelector(state => state.token)

    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(resetStore())
    }

    return (
        <AppBar position="static" color="secondary" style={{height: window.innerHeight/16}} elevation={10}>
            <Toolbar>
            {!!token && !!currentUser ? 
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={handleLogout} style={{float: "right", fontSize: "10px", marginBottom: "2%"}} color="primary">Logout</Button>
                    </Grid>
                </Grid> : <div></div>}
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
