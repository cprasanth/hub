import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dateFns from 'date-fns';
import DayView from './dayView';

const styles = theme => {
  return ({
    nextWeek: {
      clear: 'both',
      marginTop: '150px',
    }
  })
};

class NextWeek extends Component {
  state = {
    currentWeek: new Date(),    
  }
  
  renderDays = () => {
    const { data, addReservation, removeReservation } = this.props;
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
    const { classes } = this.props;
    return (
      <section key="nextweek" className={classes.nextWeek}>
        <Typography variant="h5">Next</Typography>
        <this.renderDays />
      </section>
    )
  }
}

export default withStyles(styles)(NextWeek);