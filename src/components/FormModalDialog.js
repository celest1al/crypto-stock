import React from "react";
import PropTypes from "prop-types";
import currencyFormatter from "currency-formatter"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const DialogForm = props => {
  let disabled = true
  let cryptoIndex = props.portfolio.findIndex(val => val.symbol === props.dataCrypto.symbol)
  if (props.type === "buy" && props.money > props.dataCrypto.price * props.value && props.value) {
    disabled = false
  } else if (
    props.type === "sell" &&
    props.portfolio[cryptoIndex] &&
    props.portfolio[cryptoIndex].total >= props.value && props.value) {
    disabled = false
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth="sm">
      <DialogTitle>{`${props.type.toUpperCase()} PORTFOLIO`}</DialogTitle>
      <DialogContent>
        <p>{`Your balance: ${currencyFormatter.format(props.money, { code: "IDR" })}`}</p>
        <p>{`${props.dataCrypto.name} portfolio: ${props.portfolio[cryptoIndex] ? props.portfolio[cryptoIndex].total : 0}`}</p>
        <p>{`Price: ${currencyFormatter.format(props.dataCrypto.price, { code: "IDR" })}`}</p>
        <TextField
          margin="dense"
          id="nominal"
          label="nominal"
          type="number"
          value={props.value}
          onChange={props.handleChangeValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSubmit} color="primary" disabled={disabled}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogForm.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  money: PropTypes.number,
  portfolio: PropTypes.array,
  dataCrypto: PropTypes.object,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChangeValue: PropTypes.func
};

export default DialogForm;
