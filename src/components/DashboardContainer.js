import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Money from "@material-ui/icons/Money";
import currencyFormatter from "currency-formatter";

import { styles } from "../constant/styles";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      money: props.transaction.money
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.transaction !== prevProps) {
      this.setState({
        money: this.props.transaction.money
      })
    }
  }

  render() {
    const { classes } = this.props;
    const { money } = this.state;
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                CryptoStock
              </Typography>
              <Money />
              <p>{currencyFormatter.format(money, { code: "IDR" })}</p>
            </Toolbar>
          </AppBar>
        </div>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  transaction: PropTypes.object
};

const mapStateToProps = state => {
  return {
    transaction: state.transaction
  }
}


export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
