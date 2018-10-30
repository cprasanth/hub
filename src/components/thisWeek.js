import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dateFns from 'date-fns';
import DayView from './dayView';

const styles = theme => {
  return ({
    thisWeek: {
      clear: 'both',
      marginTop: '20px',
    }
  })
};

class ThisWeek extends Component {
  state = {
    currentWeek: new Date(),    
  }
  
  renderDays = () => {
    const { data, addReservation, removeReservation } = this.props;
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
    const { classes} = this.props;
    return (
      <section key="thisweek" className={classes.thisWeek}>
        <Typography variant="h5">This</Typography>
        <this.renderDays />
      </section>
    )
  }
}

export default withStyles(styles)(ThisWeek);