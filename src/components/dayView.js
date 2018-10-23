import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import dateFns from 'date-fns';

const styles = theme => {
  return ({
    dayView: {
      border: 'solid 1px gray',
      float: 'left',
      margin: '10px',
      height: '150px',
      padding: '10px',
      cursor: 'pointer',
    }
  })
};

class DayView extends Component {
  state = {
    currentWeek: new Date(),
    currentUser: localStorage.getItem('user')
  }

  status = "not reserved";
  space = "";
  confirmChange = () => {
    if(this.status === "not reserved"){
      if(window.confirm("Reserve a space?")){
        const currentFolder = dateFns.format(this.props.wkStart, "DDMMYYYY");
        const curDay = dateFns.format(this.props.val, "ddd").toLowerCase();
        this.props.addReservation(currentFolder, curDay, this.state.currentUser)
      }
    }else{
      if(window.confirm("Cancel this reservation?")){
        const currentFolder = dateFns.format(this.props.wkStart, "DDMMYYYY");
        const curDay = dateFns.format(this.props.val, "ddd").toLowerCase();
        this.props.removeReservation(currentFolder, curDay, this.state.currentUser)
      }
    }
  }
  render() {
    const { val, data, wkStart, classes } = this.props;
    const formattedDay = dateFns.format(val, "ddd");
    const formattedDate = dateFns.format(val, "Do MMM");
    const currentFolder = dateFns.format(wkStart, "DDMMYYYY");
    const curDay = dateFns.format(this.props.val, "ddd").toLowerCase();


    if (data) {
      if (data[currentFolder]) {
        if (data[currentFolder].status[curDay]) {
          for(let key in data[currentFolder].status[curDay]){
            
            for(let key2 in data[currentFolder].status[curDay][key]){
              if(data[currentFolder].status[curDay][key][key2] === this.state.currentUser){
                if(key !== "normal"){
                  this.space = key;
                }else{
                  this.space = ""; 
                }
                this.space += " " + key2;
                this.status = "reserved";
              }
            }

          }
          
        }
        if (data[currentFolder].requests[curDay]) {
          for(let key in data[currentFolder].requests[curDay]){
            if(data[currentFolder].requests[curDay][key]===this.state.currentUser){
              this.status = "waitinglist";
            }
          }
        }
      }
    }


    return (
      <div key="day" onClick={this.confirmChange} className={classes.dayView}>
        <Typography variant="h6">{formattedDay} {formattedDate}</Typography>
        <Typography variant="body1">{this.status}</Typography>
        <Typography variant="body1">{this.space}</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(DayView);