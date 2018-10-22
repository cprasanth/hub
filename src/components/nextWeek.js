import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import dateFns from 'date-fns';
import DayView from './dayView';

const styles = theme => {
  return ({

  })
};

class NextWeek extends Component {
  state = {
    currentWeek: new Date(),    
  }
  
  renderDays = () => {
    const { classes, data, addReservation, removeReservation } = this.props;
    const strtWeek = dateFns.endOfWeek(this.state.currentWeek);
    const days = []
    let i;
    for(i=2; i<7; i++){
      const thisDay = dateFns.addDays(strtWeek, i)
      days.push(<DayView data={data} addReservation={addReservation} removeReservation={removeReservation} val={thisDay} key={i} wkStart={dateFns.addDays(strtWeek, 2)} />)
    }
    return days;
  }

  render() {
    return (
      <Grid container key="home">
        <Grid item xs={12}>
          <Typography variant="h5">Next week</Typography>
          <this.renderDays />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(NextWeek);