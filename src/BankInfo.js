import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {TabPanel} from './FullPlanList'
import {Grid, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, makeStyles, Table, TableContainer, TableCell, TableHead, TableBody, TableRow} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { transactions } from './reducers/categories'
import BankOfAmerica from './images/Bankofamerica.png'
import Chase from './images/Chase5.png'
import Citi from './images/citi.png'
import Suntrust from './images/Suntrust.png'
import WellsFargo from './images/wellsfargo.png'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
  }));

const BankInfo = (props) => {
    const selectedPanel = useSelector(state => state.selectedPanel)
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])
    const [balance, setBalance] = useState(0.00)
    const [expanded, setExpanded] = useState(false);
    const [incomeRows, setIncomeRows] = useState([])
    const [expenseRows, setExpenseRows] = useState([])
    const [image, setImage] = useState("")
    const images = [Chase, BankOfAmerica, Suntrust, WellsFargo, Citi]

    const classes = useStyles()

    const getImage = () => {
        switch(props.account.account.p_institution){
            case "Chase":
                return setImage(images[0])
            case "Bank of America":
                return setImage(images[1])                     
            case "SunTrust - Online Banking":
                return setImage(images[2])
            case "Wells Fargo":
                return setImage(images[3])
            case "Citi":
                return setImage(images[4])
            default:
                return setImage(images[0])
        }
    }   
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const createData = (Category, Description, Date, Value) => {
        return { Category, Description, Date, Value };
    }

    const setArrays = () => {
        let incomeArr = []
        let expenseArr = []
        let incomeRowArr = []
        let expenseRowArr = []
        let balanceSum = 0.00
        props.account.transactions.map(transaction => {
            
            if(transaction.transaction.value >= 0){
                incomeArr.push(transaction)
                incomeRowArr.push(createData(transaction.transaction_category.name, transaction.transaction.description, transaction.transaction.date, formatter.format(transaction.transaction.value)))
            }
            else{
                expenseArr.push(transaction)
                expenseRowArr.push(createData(transaction.transaction_category.name, transaction.transaction.description, transaction.transaction.date, formatter.format(transaction.transaction.value)))
            }
            balanceSum += transaction.transaction.value
        })
        setExpenses(expenseArr)
        setIncomes(incomeArr)
        setBalance(balanceSum)
        setIncomeRows(incomeRowArr)
        setExpenseRows(expenseRowArr)
    }

    useEffect(() => {
        setArrays()
        getImage()
    }, [])
    
    return (
        <TabPanel value={selectedPanel} index={props.num}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item xs={12} style={{width: "25%"}}>
                        <Paper elevation={3} style={{textAlign: "center"}}>
                            <img src={image} height="75%" width="75%" style={{paddingTop:"10px"}}/>
                        </Paper>
                    </Grid>
                <Grid item xs={12} style={{width: "75%"}}>
                    <Paper elevation={3} style={{textAlign: "center"}}>
                        <Typography variant="overline" color="secondary" style={{fontSize: "16px"}}>
                            {props.account.account.p_institution} Balance: {formatter.format(balance)}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{width: "75%"}}>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>Number of income transactions -</Typography>
                        <Typography className={classes.secondaryHeading}>{incomes.length}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Type</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {incomeRows.map((row) => (
                                        <TableRow key={row.Description}>
                                            <TableCell component="th" scope="row">
                                                {row.Category}
                                            </TableCell>
                                            <TableCell align="right">{row.Description}</TableCell>
                                            <TableCell align="right">{row.Date}</TableCell>
                                            <TableCell align="right">{row.Value}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} style={{width: "75%"}}>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                        <Typography className={classes.heading}>Number of expense transactions -</Typography>
                        <Typography color="secondary" className={classes.secondaryHeading}>{expenses.length}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Value</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {expenseRows.map((row) => (
                                        <TableRow key={row.Description}>
                                        <TableCell component="th" scope="row">
                                            {row.Category}
                                        </TableCell>
                                        <TableCell align="right">{row.Description}</TableCell>
                                        <TableCell align="right">{row.Date}</TableCell>
                                        <TableCell align="right">{row.Value}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </TabPanel>
    )
}

export default BankInfo
