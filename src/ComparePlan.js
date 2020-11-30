import React, {useEffect} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import {Paper} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {setExpectedIncomesArray, setExpectedExpensesArray, setActualIncomesArray, setActualExpensesArray} from './actions'
import { accounts } from './reducers/plaid'
import { transactions, category, expenseCategories } from './reducers/categories'
const ComparePlan = () => {

    const comparePlan = useSelector(state => state.comparePlan)
    const expectedIncomesArray = useSelector(state => state.expectedIncomesArray)
    const expectedExpensesArray = useSelector(state => state.expectedExpensesArray)
    const actualIncomesArray = useSelector(state => state.actualIncomesArray)
    const actualExpensesArray = useSelector(state => state.actualExpensesArray)
    const accounts = useSelector(state => state.accounts)
    const dispatch = useDispatch()

    const getExpectedTransactions = () => {
        let incomeObjArr = []
        let expenseObjArr = []
        // debugger
        comparePlan.incomeInfo.map(category => {
            // debugger
            let incomeSum = 0.00
            category.incomes.map(income => {
                incomeSum += income.value
            })
            let obj = {
                "x": category.cat.name,
                "y": incomeSum
            }
            incomeObjArr.push(obj)
        })

        comparePlan.expenseInfo.map(category => {
            // debugger
            let expenseSum = 0.00
            category.expenses.map(expense => {
                expenseSum += expense.value
            })
            let obj = {
                "x": category.cat.name,
                "y": expenseSum
            }
            expenseObjArr.push(obj)
        })
        // debugger
        dispatch(setExpectedExpensesArray(expenseObjArr))
        dispatch(setExpectedIncomesArray(incomeObjArr))
    }

    const getActualTransactions = () => {
        let incomeObjArr = []
        let expenseObjArr = [] 
        let incomeCategories = {}
        let expenseCategories = {}
        accounts.map(account => {
            account.transactions.map(transaction => {
                if(transaction.transaction.value >= 0){
                    if(!incomeCategories[transaction.transaction_category.name]){
                        incomeCategories[transaction.transaction_category.name] = transaction.transaction.value
                        // debugger
                    }
                    else{
                        incomeCategories[transaction.transaction_category.name] += transaction.transaction.value
                        // debugger
                    }
                }
                else{
                    if(!expenseCategories[transaction.transaction_category.name]){
                        expenseCategories[transaction.transaction_category.name] = transaction.transaction.value
                    }
                    else{
                        expenseCategories[transaction.transaction_category.name] += transaction.transaction.value
                    }
                }
            })
        })
        for (const [key, value] of Object.entries(incomeCategories)) {
            // debugger
            const incomeObj = {
                "x": key,
                "y": value
            }
            incomeObjArr.push(incomeObj)
        }
        for (const [key, value] of Object.entries(expenseCategories)) {
            // debugger
            const expenseObj = {
                "x": key,
                "y": value
            }
            expenseObjArr.push(expenseObj)
        }

        // debugger
        dispatch(setActualIncomesArray(incomeObjArr))
        dispatch(setActualExpensesArray(expenseObjArr))
    }

    const incomeData = [
        {
          "id": "Expected",
          "color": "hsl(154, 70%, 50%)",
          "data": expectedIncomesArray
        },
        {
          "id": "Actual",
          "color": "hsl(135, 70%, 50%)",
          "data": actualIncomesArray
        }
    ]

    const expenseData = [
        {
          "id": "Expected",
          "color": "hsl(154, 70%, 50%)",
          "data": expectedExpensesArray
        },
        {
          "id": "Actual",
          "color": "hsl(135, 70%, 50%)",
          "data": actualExpensesArray
        }
      ]

      useEffect(() => {
          getExpectedTransactions()
          getActualTransactions()
      }, [])
    return (
        // <div>
            <Paper elevation={3} style={{height: "400px", width: "100%", backgroundColor: "white"}} color="primary">
                <ResponsiveLine
                    data={incomeData}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                    yFormat=" >-.2f"
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Income',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Price',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'accent' }}
                    pointSize={8}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </Paper>
            /* <Paper elevation={3} style={{height: "400px", width: "100%", backgroundColor: "white"}} color="primary">
                <ResponsiveLine
                    data={expenseData}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                    yFormat=" >-.2f"
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Income',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Price',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'accent' }}
                    pointSize={8}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </Paper> */
        // </div>
    )
}

export default ComparePlan
