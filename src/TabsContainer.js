import React from 'react'
import {makeStyles} from '@material-ui/core'
import {Paper, Tabs, Tab} from '@material-ui/core'
import PieChartIcon from '@material-ui/icons/PieChart';
import StorageIcon from '@material-ui/icons/Storage';
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom'
import {setTabNumber} from './actions'
import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: "100%",
      borderRadius: "0 0 25px 25px",
      backgroundColor: "whitesmoke"
    },
    grid: {
        backgroundColor: "whitesmoke",
        height: window.innerHeight
    },
    tabContainer: {
        borderRadius: "0 0 25px 25px",
    },
    selected: {
        color: "#98ee99",
        backgroundColor: "#62727b"
    },
    tabSelected: {
        color: "#98ee99",
        backgroundColor: "#98ee99"
    }
    
});

const TabsContainer = () => {

    const tabNumber = useSelector(state => state.tabNumber)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleExpenseTrackers = () => {
        dispatch(setTabNumber(1))
        history.push("/planList")
    }

    const handleFinancialPlans = () => {
        dispatch(setTabNumber(2))
        history.push("/fullPlanList")
    }

    const handleNewPlan = () => {
        dispatch(setTabNumber(3))
        history.push("/newPlan")
        // dispatch(openNewBudget())
    }

    return (
        <Paper square className={classes.root}>
          <Tabs
            value={tabNumber}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs"
            selectionFollowsFocus
            TabIndicatorProps={{className: classes.tabSelected}}
            className={classes.tabContainer}
          >
              <Tab value={1} classes={{selected: classes.selected}} onClick={() => handleExpenseTrackers()} icon={<PieChartIcon />} aria-label="EXPENSE LOGS" label="EXPENSE LOGS"/>
              <Tab value={2} classes={{selected: classes.selected}} onClick={() => handleFinancialPlans()} icon={<StorageIcon />} aria-label="Financial Plans" label="FINANCIAL PLANS"/>
              <Tab value={3} classes={{selected: classes.selected}} onClick={() => handleNewPlan()} icon={<AddIcon />} aria-label="New Plan" label="Create New Plan"/>
          </Tabs>
        </Paper>
    )
}

export default TabsContainer
