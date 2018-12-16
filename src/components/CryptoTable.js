import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import curencyFormatter from "currency-formatter";

import { fetchCryptocurrenciesAction } from "../actions/cryptoAction";
import { transactionAction } from "../actions/transactionAction";
import { styles } from "../constant/styles";

import FilterForm from "./FilterForm";
import WrappedPagination from "./WrappedPagination";
import FormDialog from "./FormModalDialog";


class CryptoTable extends PureComponent {
  state = {
    cryptocurrencies: [],
    sort: "",
    sort_dir: "",
    start: 1,
    limit: 10,
    page: 0,
    open: false,
    typeTransaction: "",
    value: "",
    portfolio: [],
    dataCrypto: {},
    money: 10000000
  };

  componentDidMount() {
    const { start, limit } = this.state;
    const money = localStorage.getItem("money");
    const portfolio = JSON.parse(localStorage.getItem("portfolio"));

    if (money && portfolio) {
      this.props.makeTransaction({ money, portfolio: portfolio })
      this.setState({
        money,
        portfolio: portfolio
      })
    } else {
      localStorage.setItem("money", 10000000);
      localStorage.setItem("portfolio", JSON.stringify([]));
      this.props.makeTransaction({ money: 10000000, portfolio: [] })
    }
    this.props.fetchCrypto({ params: `start=${start}&limit=${limit}` });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.cryptocurrencies !== prevProps.cryptocurrencies &&
      this.props.cryptocurrencies.status === 200
    ) {
      this.setState({
        cryptocurrencies: this.props.cryptocurrencies.data
      });
    }
    if (this.props.transaction !== prevProps.transaction) {
      this.setState({
        money: this.props.transaction.money,
        portfolio: this.props.transaction.portfolio
      })
    }
  }

  onHandleChangeFilter = (event) => {
    this.setState({
      sort: event.target.value
    })
  }

  onHandleChangeFilterType = (event) => {
    this.setState({
      sort_dir: event.target.value
    })
  }

  onHandleSubmitFilter = () => {
    const { sort, sort_dir, start, limit } = this.state;
    this.props.fetchCrypto({
      params: `start=${start}&limit=${limit}&sort=${sort}&sort_dir=${sort_dir}`
    })
  }

  onHandleChangePage = (type) => () => {
    const { page, start, sort_dir, sort, limit } = this.state;
    let newStart;

    if (type === "next") {
      newStart = start + 1
      this.setState({
        page: page + 1,
        start: newStart
      })
    } else {
      newStart = start - 1
      this.setState({
        page: page - 1,
        start: newStart
      })
    }

    if (sort && sort_dir) {
      this.props.fetchCrypto({
        params:`start=${newStart}&limit=${limit}&sort=${sort}&sort_dir=${sort_dir}`
      })
    } else {
      this.props.fetchCrypto({
        params: `start=${newStart}&limit=${limit}`
      })
    }
  }

  onHandleLimitTable = (event) => {
    const { start, sort, sort_dir } = this.state;
    this.setState({
      limit: Number(event.target.value)
    });
    if (sort && sort_dir) {
      this.props.fetchCrypto({
        params:`start=${start}&limit=${event.target.value}&sort=${sort}&sort_dir=${sort_dir}`
      })
    } else {
      this.props.fetchCrypto({
        params: `start=${start}&limit=${event.target.value}`
      })
    }
  }

  openTransactionModal = (data, type) => () => {
    this.setState({
      typeTransaction: type,
      open: true,
      dataCrypto: data
    })
  }

  closeTransactionModal = () => {
    this.setState({
      open: false,
      value: ""
    })
  }

  onHandleChangeValue = event => {
    this.setState({
      value: event.target.value
    })
  }

  onSubmitTransaction = () => {
    const { portfolio, dataCrypto, typeTransaction, value, money } = this.state;
    let indexCrypto = portfolio.findIndex(val => val.symbol === dataCrypto.symbol)

    // if transaction is buying
    if (typeTransaction === "buy") {
      const newMoney = Math.round(Number(money) - Number(value) * Number(dataCrypto.price));
      let newArr = [...portfolio]
      // check if we have portfolio of the crypto we choose
      if (indexCrypto !== -1) {
        // if we have, we update the current total portfolio
        let newPortfolio = newArr.splice(indexCrypto, 1);
        let newObjPortfolio = {
          name: dataCrypto.name,
          symbol: dataCrypto.symbol,
          total: Number(value) + Number(newPortfolio[0].total)
        }
        localStorage.setItem("money", newMoney);
        localStorage.setItem("portfolio", JSON.stringify([...newArr, newObjPortfolio]));
        this.props.makeTransaction({
          money: newMoney,
          portfolio: [...newPortfolio, newObjPortfolio]
        })
      } else {
        // if we dont have, we push a new portfolio
        let newObjPortfolio = {
          name: dataCrypto.name,
          symbol: dataCrypto.symbol,
          total: value
        }
        localStorage.setItem("money", newMoney);
        localStorage.setItem("portfolio", JSON.stringify([...portfolio, newObjPortfolio]));
        this.props.makeTransaction({
          money: newMoney,
          portfolio: [...portfolio, newObjPortfolio]
        })
      }
    }
    // check if transaction is selling
    else if (typeTransaction === "sell") {
      const newMoney = Math.round(Number(money) + Number(value) * Number(dataCrypto.price));
      let newArr = [...portfolio]
      // check if we have portfolio of the crypto we choose
      if (indexCrypto !== -1) {
        let newPortfolio = newArr.splice(indexCrypto, 1);
        let newTotal = Number(newPortfolio[0].total) - Number(value)
        // check new total of the crypto we choose
        if (newTotal === 0) {
          // if the new total is zero, we remove from our portfolio
          localStorage.setItem("money", newMoney);
          localStorage.setItem("portfolio", JSON.stringify([...newArr]));
          this.props.makeTransaction({
            money: newMoney,
            portfolio: [...newArr]
          })
        }
        // if total is bigger than 0, than we update the total crypto
        else if (newTotal > 0) {
          let newObj = {
            name: dataCrypto.name,
            symbol: dataCrypto.symbol,
            total: newTotal
          }
          localStorage.setItem("money", newMoney);
          localStorage.setItem("portfolio", JSON.stringify([...newArr, newObj]));
          this.props.makeTransaction({
            money: newMoney,
            portfolio: [...newArr, newObj]
          })
        }
      }
    }
    this.closeTransactionModal()
  }

  render() {
    const { classes } = this.props;
    const {
      portfolio,
      cryptocurrencies,
      sort,
      sort_dir,
      limit,
      page,
      open,
      value,
      typeTransaction,
      money,
      dataCrypto } = this.state;

    return (
      <Paper className={classes.tableRoot}>
        <FilterForm
          classes={classes}
          sort={sort}
          sort_dir={sort_dir}
          handleChangeFilter={this.onHandleChangeFilter}
          handleChangeFilterType={this.onHandleChangeFilterType}
          handleClick={this.onHandleSubmitFilter}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Volume in 24 H</TableCell>
              <TableCell>Percent in 24H</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptocurrencies.map(crypto => {
              let dataCrypto = {
                symbol: crypto.symbol,
                price: crypto.quote && Math.round(crypto.quote.IDR.price),
                name: crypto.name
              }
              let sellDisabled = portfolio.findIndex(val => val.symbol === crypto.symbol)
              return (
                <TableRow key={crypto.id}>
                  <TableCell component="th" scope="row">
                    {crypto.cmc_rank}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {crypto.id}
                  </TableCell>
                  <TableCell>{crypto.symbol}</TableCell>
                  <TableCell>{crypto.name}</TableCell>
                  <TableCell>{crypto.quote ? curencyFormatter.format(Math.round(crypto.quote.IDR.price), { code: "IDR" }) : 0}</TableCell>
                  <TableCell>{crypto.quote && crypto.quote.IDR.volume_24h}</TableCell>
                  <TableCell>{`${crypto.quote && crypto.quote.IDR.percent_change_24h}%`}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.openTransactionModal(dataCrypto, "buy")}
                    >
                      Beli
                      </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={!(sellDisabled !== -1)}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={this.openTransactionModal(dataCrypto, "sell")}
                    >
                      Jual
                      </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={cryptocurrencies.length}
                rowsPerPage={limit}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.onHandleChangePage}
                onChangeRowsPerPage={this.onHandleLimitTable}
                ActionsComponent={WrappedPagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <FormDialog
          portfolio={portfolio}
          type={typeTransaction}
          money={Number(money)}
          dataCrypto={dataCrypto}
          open={open}
          handleClose={this.closeTransactionModal}
          value={value}
          handleChangeValue={this.onHandleChangeValue}
          handleSubmit={this.onSubmitTransaction}
        />
      </Paper>
    );
  }
}

CryptoTable.propTypes = {
  classes: PropTypes.object.isRequired,
  cryptocurrencies: PropTypes.object,
  transaction: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cryptocurrencies: state.cryptoCurrencies,
    transaction: state.transaction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCrypto: data => dispatch(fetchCryptocurrenciesAction(data)),
    makeTransaction: data => dispatch(transactionAction(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CryptoTable));
