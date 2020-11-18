import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    // padding: "10px",
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const NewBudget = (props) => {
    const classes = useStyles()
    return (
        <Modal
        open={props.open}
        onClose={props.handleBudgetModel}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <form>
              

          </form>
        </div>
      </Modal>
    )
}

export default NewBudget
