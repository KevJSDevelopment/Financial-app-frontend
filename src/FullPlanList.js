import React, {useEffect} from 'react'
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
    backgroundColor: "whitesmoke",
    display: 'flex',
    paddingTop: "1%",
    marginTop: "1%",
    height: window.innerHeight
    },
    label: {
        borderRadius: 0,
        textAlign: "center",
        borderTop: "1px solid #62727b",
        borderBottom: "1px solid #62727b"
    },
    tab: {
        marginTop: "1%",
        marginBottom: "10%",
        padding: "5%",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },
    tabContainer: {
        borderRight: `2px solid #62727b`,
        borderRadius: "0 25px 25px 0",
        backgroundColor: "white"
    },
    selected: {
        color: "#98ee99",
        backgroundColor: "#62727b"
    },
    tabSelected: {
        color: "#98ee99",
        backgroundColor: "#98ee99"
    }
}));

const FullPlanList = () => {

    const selectedPanel = useSelector(state => state.selectedPanel)
    const budgets = useSelector(state => state.budgets)
    const planView = useSelector(state => state.planView)
    const accounts = useSelector(state => state.accounts)
    const comparePlan = useSelector(state => state.comparePlan)

    // const transactions = useSelector(state => state.transactions)
    // const loading = useSelector(state => state.loading)
    // const currentUser = useSelector(state => state.currentUser)

    let tabNum = 3
    let panelNum = 4

    const history = useHistory()
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
        // dispatch(setLoading(false))
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
                        My Banks
                    </Typography>
                </Paper>
                <Tab classes={{selected: classes.selected}} className={classes.tab} label="My Transactions" {...allyProps(3)} />
                {accounts.map((account)=> {
                    return <Tab classes={{selected: classes.selected}} key={account.account.id} className={classes.tab} label={account.account.p_institution} {...allyProps((tabNum++))} />
                })}
                <Link getPlaidAccounts={getPlaidAccounts} />
            </Tabs>
            <TabPanel value={selectedPanel} index={1}>
                <Grid container spacing={3} direction="row">
                    {!planView && !comparePlan ? budgets.map(budget => {
                        if(budget.plan_type === "full"){
                            return <FullBudgetCard budget={budget} key={budget.id}/> 
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
