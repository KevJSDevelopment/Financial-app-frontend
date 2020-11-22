import React from 'react'
import SimpleGraph from './SimpleGraph'
import SimpleLog from './SimpleLog'
import {changeDisplayGraph} from './actions'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from '@material-ui/core'

const SimpleBudget = () => {
    const displayGraph = useSelector(state => state.displayGraph) // true/false
    const dispatch = useDispatch()
    return (
        <div>
            <Button onClick={() => dispatch(changeDisplayGraph(!displayGraph))}>
                change display
            </Button>
            {!displayGraph ? <SimpleGraph /> : <SimpleLog /> }
        </div>
    )
}

export default SimpleBudget
