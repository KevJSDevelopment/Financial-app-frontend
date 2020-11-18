import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget} from './budgets'

const reducers = combineReducers({
    budgets: budgetsReducer,
    budgetOpen: newBudget,
    newBudgetType: newBudgetType, 
    currentBudget: currentBudget
})

export default reducers