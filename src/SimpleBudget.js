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
    },
    grid: {
        backgroundColor: "whitesmoke",
        height: window.innerHeight
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
                    onChange={() => dispatch(changeDisplayGraph(!displayGraph))}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs"
                >
                    <Tab icon={<PieChartIcon />} aria-label="pie chart" label="PIE CHART"/>
                    <Tab icon={<StorageIcon />} aria-label="expense log" label="EXPENSE LOG"/>
                </Tabs>
            </Paper>
            {!displayGraph ? <SimpleGraph /> : <SimpleLog /> }
        </div>
    )
}

export default SimpleBudget
