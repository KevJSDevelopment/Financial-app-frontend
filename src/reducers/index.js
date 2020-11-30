import {combineReducers} from 'redux'
import {budgetsReducer, newBudget, newBudgetType, currentBudget, dataArr, fromDate, toDate, total, simpleTableRows, startDate} from './budgets'
import {categoryList, category, selectedArr, incomeCategories, expenseCategories, transactions} from './categories'
import {amount, expDate} from './expenses'
import { displayGraph, tabNumber, selectedPanel, planView, incomeRows, expenseRows, loading, comparePlan } from './pageInfo'
import { token, currentUser } from './user'
import { accounts, bankBalance } from './plaid'
import {actualIncomesArray, expectedIncomesArray, expectedExpensesArray, actualExpensesArray} from './compare'
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
    selectedPanel: selectedPanel,
    planView: planView,
    incomeRows: incomeRows,
    expenseRows: expenseRows,
    loading: loading,
    incomeCategories: incomeCategories,
    expenseCategories: expenseCategories,
    accounts: accounts,
    transactions: transactions,
    bankBalance: bankBalance,
    comparePlan: comparePlan,
    expectedIncomesArray: expectedIncomesArray,
    expectedExpensesArray: expectedExpensesArray,
    actualIncomesArray: actualIncomesArray,
    actualExpensesArray: actualExpensesArray

})

export default reducers