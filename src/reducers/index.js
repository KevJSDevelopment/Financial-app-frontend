import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget, dataArr, fromDate, toDate, total, simpleTableRows, startDate} from './budgets'
import {categoryList, category, selectedArr} from './categories'
import {amount, expDate} from './expenses'
import { displayGraph, tabNumber, selectedPanel } from './pageInfo'
import { token, currentUser } from './user'
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
    displayGraph: displayGraph,
    simpleTableRows: simpleTableRows,
    selectedArr: selectedArr,
    token: token,
    currentUser: currentUser,
    tabNumber: tabNumber,
    startDate: startDate,
    selectedPanel: selectedPanel
    // doneLoading: loading

})

export default reducers