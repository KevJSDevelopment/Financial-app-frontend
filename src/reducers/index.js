import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget} from './budgets'
import {loading} from './loading'
import {categoryList, category} from './categories'

const reducers = combineReducers({
    budgets: budgetsReducer,
    budgetOpen: newBudget,
    newBudgetType: newBudgetType, 
    currentBudget: currentBudget,
    categoryList: categoryList,
    loading: loading,
    category: category

})

export default reducers