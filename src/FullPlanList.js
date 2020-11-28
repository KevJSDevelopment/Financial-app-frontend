import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useSelector, useDispatch} from 'react-redux'
import {changeSelectedPanel} from './actions'
import Link from './Link'
import { useHistory } from 'react-router-dom';
import FullBudgetCard from './FullBudgetCard'
import Grid from '@material-ui/core/Grid'
import ViewPlan from './ViewPlan'

const TabPanel = (props) => {
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

    const history = useHistory()
    const classes = useStyles()
    const dispatch = useDispatch()

    const getFinancialPlans = () => {
        
    }

    const handleSelection = (newValue) => {
        dispatch(changeSelectedPanel(newValue))
    }

    useEffect(() => {
    
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
                <Tab classes={{selected: classes.selected}} className={classes.tab} label="Financial Plans" {...allyProps(0)} />
                <Tab classes={{selected: classes.selected}} className={classes.tab} label="All Transactions" {...allyProps(1)} />
                <Tab classes={{selected: classes.selected}} className={classes.tab} label="Compare" {...allyProps(1)} />
                <Link />
            </Tabs>
            <TabPanel value={selectedPanel} index={0}>
                <Grid container spacing={3} direction="row">
                    {!planView ? budgets.map(budget => {
                        if(budget.plan_type === "full"){
                            return <FullBudgetCard budget={budget} key={budget.id}/> 
                        }
                    }) : <ViewPlan /> }
                </Grid>
            </TabPanel>
            <TabPanel value={selectedPanel} index={1}>
                Item Two
            </TabPanel>
        </div>
    )
}

export default FullPlanList
