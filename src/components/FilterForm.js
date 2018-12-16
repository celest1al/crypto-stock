import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const FilterForm = props => {
  return (
    <div className={props.classes.headContentContainer}>
      <TextField
          id="select-crypto-filter1"
          select
          label="Select Filter"
          className={props.classes.textField}
          value={props.sort}
          onChange={props.handleChangeFilter}
          SelectProps={{
            MenuProps: {
              className: props.classes.menu,
            },
          }}
          margin="normal"
        >
          <MenuItem value="">
            None
          </MenuItem>
          <MenuItem value="ranking">
            Ranking
          </MenuItem>
          <MenuItem value="volume_24h">
            Volume in 24H
          </MenuItem>
          <MenuItem value="percent_change_24h">
            Percent Change in 24H
          </MenuItem>
        </TextField>
        <TextField
          id="select-crypto-filter2"
          select
          label="Select Type Filter"
          className={props.classes.textField}
          value={props.sort_dir}
          onChange={props.handleChangeFilterType}
          SelectProps={{
            MenuProps: {
              className: props.classes.menu,
            },
          }}
          margin="normal"
        >
          <MenuItem value="">
            None
          </MenuItem>
          <MenuItem value="asc">
            Ascending
          </MenuItem>
          <MenuItem value="desc">
            Descending
          </MenuItem>
        </TextField>
      <Button
        variant="contained"
        color="primary"
        className={props.classes.button}
        disabled={!props.sort || !props.sort_dir}
        onClick={props.handleClick}
      >
        Search
      </Button>
      {props.additionalButton && props.additionalButton}
    </div>
  );
};

FilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  sort: PropTypes.string,
  sort_dir: PropTypes.string,
  handleClick: PropTypes.func,
  handleChangeFilter: PropTypes.func,
  handleChangeFilterType: PropTypes.func
};

export default FilterForm;
