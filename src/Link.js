import React from 'react'
import { PlaidLink, usePlaidLink }from "react-plaid-link";
// import { trackPromise } from 'react-promise-tracker'
import {makeStyles} from '@material-ui/core'
import {useSelector} from 'react-redux'

const useStyles = makeStyles({
    button: {
      backgroundColor: "white",
      color: "#62727b",
      '&:hover': {
        borderRight: "2px solid #98ee99",
        cursor: "pointer",
        backgroundColor: "whitesmoke",
        // color: "#98ee99"
      },
    },
    
});

const Link = () => {

    const currentUser = useSelector(state => state.currentUser)
    const classes = useStyles()

    const addData = () => {

    }

    const handleDisplay = () => {

    }
    const setUserView = () => {

    }

    const handleOnExit = () => {

    }

    const handleOnSuccess = (public_token, metadata) => {
        // debugger
        // trackPromise(
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
          } else {

            debugger
            // transactions have account_ids, need to add account_names and institution
            let transactions = data.transactions.map( tran => {
                let account = data.accounts.filter( acc => { 
                    return acc.account_id === tran.account_id
                })
                return {...tran, account_name: account[0].name}
        
            })
            addData({ 
              transactions: transactions, 
              accounts: data.accounts
            })
            handleDisplay()
            
            setUserView()
          }
        })
        // )
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
