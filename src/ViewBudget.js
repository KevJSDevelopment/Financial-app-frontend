import React, {useEffect} from 'react'
import {Grid, FormControl, Select, MenuItem} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
// import {PieChart, Pie, Sector, Cell} from 'recharts';
import {ResponsivePie} from '@nivo/pie'
import {setCategoryList, setCategory, setDataArr} from './actions'

const ViewBudget = () => {
    const categoryList = useSelector(state => state.categoryList)
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    // const COLORS = ["#59e008", "#d2624d", "#22456a", "#eec0b7", "#6f3fc9", "#f293e7", "#69eabd", "#f9b1c3", "#23d5f9", "#dd9228", "#5d919c", "#a72751", "#326568", "#cefba8", "#81485b", "#887c91"]
    const dataArr = useSelector(state => state.dataArr)
    const getData = () => {
        // debugger
        fetch(`http://localhost:3000/budgets/${localStorage.getItem("budgetId")}`)
        .then(res => res.json())
        .then(data => {
            const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
            let dataArr = []
            let catArr = []
            budgetObject.expenseInfo.map(category => {
                let sum = 0
                category.expenses.forEach(expense => {
                    sum += expense.cost
                })
                const obj = {
                    "id": category.cat.name,

                    "value": sum
                }
                catArr.push(category.cat.name)
                dataArr.push(obj)
            })
            dispatch(setCategoryList(catArr))
            dispatch(setDataArr(dataArr))
        })
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <Grid container direction="row" spacing={3}>
            <Grid style={{height: "500px" }} item xs={6}>
                <ResponsivePie
                    data={dataArr}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    cornerRadius={4}
                    colors={{ scheme: 'set1' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkColor={{ from: 'color' }}
                    sliceLabelsSkipAngle={10}
                    sliceLabelsTextColor="#333333"
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl>
                    <Select
                        native
                        value={category}
                        onChange={(ev) => {
                        dispatch(setCategory(ev.target.value))
                        }}
                    >
                        <option value="">None</option>
                        {categoryList.map(category => {
                            return <option value={category}>{category}</option>
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default ViewBudget
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

  
    