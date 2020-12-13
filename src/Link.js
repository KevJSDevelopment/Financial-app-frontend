import React from 'react'
import { PlaidLink, usePlaidLink }from "react-plaid-link";
import {makeStyles} from '@material-ui/core'
import {useSelector} from 'react-redux'

const useStyles = makeStyles({
    button: {
      backgroundColor: "white",
      color: "#7e858d",
      '&:hover': {
        borderRight: "2px solid #aed581",
        cursor: "pointer",
        backgroundColor: "whitesmoke",
      },
    },
    
});

const Link = (props) => {

    const currentUser = useSelector(state => state.currentUser)
    const classes = useStyles()

    const handleOnSuccess = (public_token, metadata) => {
        fetch("http://localhost:3000/get_access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authentication": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            public_token: public_token,
            user_id: currentUser.id, 
            institution: metadata.institution.name 
          })
        })
        .then(resp => resp.json())
        .then(data => {
          if (!data.auth){
            alert(data.message)
          } 
          else {
            props.getPlaidAccounts()
          }
        })
      }


    return (
        <div className={classes.button}>
          <PlaidLink
            token={localStorage.getItem("link")}
            onSuccess={handleOnSuccess}
            style={{
              color: "inherit", 
              textAlign:"center", 
              width:"100%", 
              border: "0",
              cursor: "pointer",
              fontSize: "16px",
              padding: "5%",
              borderRadius: "0",
              backgroundColor: "inherit"
            }}
            >
            ADD BANK +
          </PlaidLink>
        </div>
    )
}

export default Link
