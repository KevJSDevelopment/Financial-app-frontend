import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useSelector, useDispatch} from 'react-redux'
import {changeSelectedPanel, setBudgets, setAccounts, setCurrentUser, setTransactions, setLoading} from './actions'
import Link from './Link'
import { useHistory } from 'react-router-dom';
import FullBudgetCard from './FullBudgetCard'
import Grid from '@material-ui/core/Grid'
import ViewPlan from './ViewPlan'
import { Paper } from '@material-ui/core';
import BankInfo from './BankInfo'
import Transactions from './Transactions'
import ComparePlan from './ComparePlan'
import BankOfAmerica from './images/Bankofamerica.png'
import Chase from './images/Chase5.png'
import Citi from './images/citi.png'
import Suntrust from './images/Suntrust.png'
import WellsFargo from './images/wellsfargo.png'

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{width: "85%"}}
    >
        {value === index && (
        <Box p={3}>
            <Typography>{children}</Typography>
        </Box>
        )}
    </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};    

const allyProps = (index) => {
    return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: "1%",
    marginTop: "1%",
    height: window.innerHeight
    },
    label: {
        borderRadius: 0,
        textAlign: "center",
        borderTop: "1px solid #7e858d",
        borderBottom: "1px solid #7e858d"
    },
    tab: {
        marginTop: "1%",
        marginBottom: "10%",
        padding: "5%",
        '&:hover': {
            borderRight: "2px solid #aed581",
            cursor: "pointer",
            backgroundColor: "whitesmoke",
        },
    },
    tabContainer: {
        borderRight: `2px solid #7e858d`,
        borderRadius: "0 25px 25px 0",
        backgroundColor: "white"
    },
    selected: {
        color: "#e1ffb1",
        backgroundColor: "#7e858d"
    },
    tabSelected: {
        color: "#e1ffb1",
        backgroundColor: "#e1ffb1"
    }
}));

const FullPlanList = () => {

    const images = [Chase, BankOfAmerica, Suntrust, WellsFargo, Citi]
    const selectedPanel = useSelector(state => state.selectedPanel)
    const budgets = useSelector(state => state.budgets)
    const planView = useSelector(state => state.planView)
    const accounts = useSelector(state => state.accounts)
    const comparePlan = useSelector(state => state.comparePlan)

    let tabNum = 3
    let panelNum = 4

    const classes = useStyles()

    const dispatch = useDispatch()

    const getUser = async () => {
        const res = await fetch("http://localhost:3000/users",{
            headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
        })
        const data = await res.json()
        if(data.auth){
            dispatch(setCurrentUser(data.user))
        }
        else{
            alert(data.message)
        }
    }

    const getFinancialPlans = async () => {
        const res = await fetch("http://localhost:3000/budgets",{
            headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
        })
        const data = await res.json()
        if(data.auth){
            dispatch(setBudgets(data.budgets))
        }
        else{
            alert(data.message)
        }
    }

    const getPlaidAccounts = async () => {
        const res = await fetch("http://localhost:3000/plaid_accounts",{
            headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
        })
        const data = await res.json()
        if(data.auth){
            dispatch(setAccounts(data.accounts))
        }
        else{
            alert(data.message)
        }
    }

    const handleSelection = (newValue) => {
        dispatch(changeSelectedPanel(newValue))
    }

    useEffect(() => {
        getUser()
        getFinancialPlans()
        getPlaidAccounts()
    }, [])

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedPanel}
                onChange={(ev, newValue) => handleSelection(newValue)}
                aria-label="Vertical tabs example"
                TabIndicatorProps={{className: classes.tabSelected}}
                className={classes.tabContainer}
            >
                <Paper elevation={3} className={classes.label}>
                    <Typography variant="overline" color="secondary">
                        Financial Plans
                    </Typography>
                </Paper>
                <Tab classes={{selected: classes.selected}} className={classes.tab} label="My Plans" {...allyProps(1)} />
                <Paper elevation={3} className={classes.label}>
                    <Typography variant="overline" color="secondary">
                        Bank Information
                    </Typography>
                </Paper>
                <Tab classes={{selected: classes.selected}} className={classes.tab} label="My Transactions" {...allyProps(3)} />
                {accounts.map((account)=> {
                     switch(account.account.p_institution){
                        case "Chase":
                            return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={<img src={images[0]} width="120" height="40" />} {...allyProps((tabNum++))} />
                        case "Bank of America":
                            return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={ <img src={images[1]} width="120" height="50" />} {...allyProps((tabNum++))} />                        
                        case "SunTrust - Online Banking":
                            return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={<img src={images[2]} width="150" height="40" />} {...allyProps((tabNum++))} />
                        case "Wells Fargo":
                            return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={<img src={images[3]} width="120" height="70" />} {...allyProps((tabNum++))} />
                        case "Citi":
                            return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={<img src={images[4]} width="120" height="25" />} {...allyProps((tabNum++))} />
                        default:
                            return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={account.account.p_institution} {...allyProps((tabNum++))} />
                    }
                })}
                <Link getPlaidAccounts={getPlaidAccounts} />
            </Tabs>
            <TabPanel value={selectedPanel} index={1}>
                <Grid container spacing={3} direction="row">
                    {!planView && !comparePlan ? budgets.map((budget, index) => {
                        if(budget.plan_type === "full"){
                            return <FullBudgetCard budget={budget} count={index} key={budget.id}/> 
                        }
                    }) : planView ? <ViewPlan /> : <ComparePlan />}
                </Grid>
            </TabPanel>
            <TabPanel value={selectedPanel} index={3}>
               <Transactions />
            </TabPanel>
            {accounts.map((account) => {
                return <BankInfo account={account} num={(panelNum++)} key={account.id} />})
            }
        </div>
    )
}

export default FullPlanList
