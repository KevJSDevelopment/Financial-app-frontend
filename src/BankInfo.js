import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {TabPanel} from './FullPlanList'

const BankInfo = (props) => {
    const selectedPanel = useSelector(state => state.selectedPanel)
    return (
        <TabPanel value={selectedPanel} index={props.panelNum}>
            
        </TabPanel>
    )
}

export default BankInfo
