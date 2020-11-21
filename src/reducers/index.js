import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget, dataArr, fromDate, toDate, total} from './budgets'
import {categoryList, category} from './categories'
import {amount, expDate} from './expenses'
import { displayGraph } from './pageInfo'
// import {loading} from './loading'

const reducers = combineReducers({
    budgets: budgetsReducer,
    budgetOpen: newBudget,
    newBudgetType: newBudgetType, 
    currentBudget: currentBudget,
    categoryList: categoryList,
    category: category,
    dataArr: dataArr,
    amount: amount,
    expDate: expDate,
    fromDate: fromDate,
    toDate: toDate,
    total: total,
    displayGraph: displayGraph

    // doneLoading: loading

})

export default reducers