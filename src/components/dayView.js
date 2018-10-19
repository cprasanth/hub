import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import dateFns from 'date-fns';

const styles = theme => {
  return ({

  })
};

class DayView extends Component {
  state = {
    currentWeek: new Date(),
    currentUser: localStorage.getItem('user'),
  }
  componentWillReceiveProps() {
    const weekFolder = dateFns.format(this.props.val, "DDMMYYYY");
    // console.log("in", this.props)
  }
  render() {
    const { val } = this.props;
    const formattedDay = dateFns.format(val, "ddd");
    const formattedDate = dateFns.format(val, "Do MMM");

    return (
      <Grid container key="home">
        <Grid item xs={12}>
          <div>{formattedDay} {formattedDate}</div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DayView);