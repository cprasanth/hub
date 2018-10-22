import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import dateFns from 'date-fns';
import DayView from './dayView';

const styles = theme => {
  return ({

  })
};

class ThisWeek extends Component {
  state = {
    currentWeek: new Date(),    
  }
  
  renderDays = () => {
    const { classes, data, addReservation, removeReservation } = this.props;
    const strtWeek = dateFns.startOfWeek(this.state.currentWeek);
    const days = []
    let i;
    for(i=1; i<6; i++){
      const thisDay = dateFns.addDays(strtWeek, i)
      days.push(<DayView data={data} addReservation={addReservation} removeReservation={removeReservation} val={thisDay} key={i}  wkStart={dateFns.addDays(strtWeek, 1)} />)
    }
    return days;
  }

  render() {    
    return (
      <Grid container key="home">
        <Grid item xs={12}>
          <Typography variant="h5">This week</Typography>
          <this.renderDays />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ThisWeek);