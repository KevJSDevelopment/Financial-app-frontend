import React from 'react'
import SimpleGraph from './SimpleGraph'
import SimpleLog from './SimpleLog'
import {changeDisplayGraph} from './actions'
import {useSelector, useDispatch} from 'react-redux'
import {Paper, Tabs, Tab, makeStyles} from '@material-ui/core'
import PieChartIcon from '@material-ui/icons/PieChart';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: "100%",
      borderRadius: "0 0 25px 25px",
    },
    grid: {
        backgroundColor: "whitesmoke",
        height: window.innerHeight
    },
    tabContainer: {
        borderRadius: "0 0 25px 25px",
    },
    tabs: {
        fontSize: "12px",
        '&:focus':{
            color: "#e1ffb1",
            backgroundColor: "#7e858d"
        }
    }
  });

const SimpleBudget = () => {
    const displayGraph = useSelector(state => state.displayGraph) // true/false

    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <div className={classes.grid}>
            <Paper square className={classes.root}>
                <Tabs
                    value={displayGraph}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs"
                    selectionFollowsFocus
                    className={classes.tabContainer}
                >
                    <Tab className={classes.tabs} onClick={() => dispatch(changeDisplayGraph(false))} icon={<PieChartIcon />} aria-label="pie chart" label="PIE CHART"/>
                    <Tab className={classes.tabs} onClick={() => dispatch(changeDisplayGraph(true))} icon={<StorageIcon />} aria-label="expense log" label="EXPENSE LOG"/>
                </Tabs>
            </Paper>
            {!displayGraph ? <SimpleGraph /> : <SimpleLog /> }
        </div>
    )
}

export default SimpleBudget
