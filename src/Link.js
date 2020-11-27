import React from 'react'
import { PlaidLink, usePlaidLink }from "react-plaid-link";
// import { trackPromise } from 'react-promise-tracker'
import {makeStyles} from '@material-ui/core'
import {useSelector} from 'react-redux'

const useStyles = makeStyles({
    button: {
    //   color: "white",
      background: "#00ca00",
      '&:hover': {
        background: "#59dd44",
      },
      fontSize: "11px"
    }
    
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
        <div>
            <PlaidLink
            token={localStorage.getItem("link")}
            onSuccess={handleOnSuccess}
            className={classes.button}
            >
            Connect a bank account
            </PlaidLink>
        </div>
    )
}

export default Link
