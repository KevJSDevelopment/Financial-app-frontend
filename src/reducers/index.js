import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget, dataArr} from './budgets'
import {categoryList, category} from './categories'
// import {loading} from './loading'

const reducers = combineReducers({
    budgets: budgetsReducer,
    budgetOpen: newBudget,
    newBudgetType: newBudgetType, 
    currentBudget: currentBudget,
    categoryList: categoryList,
    category: category,
    dataArr: dataArr
    // doneLoading: loading

})

export default reducers