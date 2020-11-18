import {combineReducers} from 'redux'
import {budgetsReducer, budgetModal} from './budgets'

const reducers = combineReducers({
    budgets: budgetsReducer,
    budgetOpen: budgetModal
})

export default reducers