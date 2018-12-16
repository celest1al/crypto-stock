import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DashboardContainer from "../components/DashboardContainer";
import CryptoTable from "../components/CryptoTable"

class CryptoPage extends Component {
  render() {
    return (
      <DashboardContainer>
        <Typography variant="h6" gutterBottom component="h4">
          Crypto Stock
        </Typography>
        <CryptoTable />
      </DashboardContainer>
    );
  }
}

export default CryptoPage;
