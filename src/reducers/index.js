import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget, dataArr, fromDate, toDate, total, simpleTableRows} from './budgets'
import {categoryList, category, selectedArr} from './categories'
import {amount, expDate} from './expenses'
import { displayGraph } from './pageInfo'
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
    currentUser: currentUser

    // doneLoading: loading

})

export default reducers