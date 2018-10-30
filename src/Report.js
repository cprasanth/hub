import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import dateFns from 'date-fns';
import { Typography, Grid, Table, TableBody, TableRow, TableCell, TableHead, Button } from '@material-ui/core';

const styles = theme => {
  return ({
    
  })
};

class Report extends Component {
  state = {currentFolder: "", displayDate:  ""};

  weekNav = () => {
    return <Grid container spacing={24}>
        <Grid item xs>
          <Button onClick={this.getPrevWeek}>&lt; Prev</Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{this.state.displayDate}</Typography>
        </Grid>
        <Grid item xs>
          <Button onClick={this.getNextWeek}>Next &gt;</Button>
        </Grid>
      </Grid>
  }
  getNextWeek = () => {
    let nextW = dateFns.addDays(this.state.strtWeek, 7);
    this.setState({strtWeek: nextW, currentFolder: dateFns.format(nextW, "DDMMYYYY"), displayDate:  dateFns.format(nextW, "DD MMM YYYY")})
  }
  getPrevWeek = () => {
    let prevW = dateFns.addDays(this.state.strtWeek, -7);
    this.setState({strtWeek: prevW, currentFolder: dateFns.format(prevW, "DDMMYYYY"), displayDate:  dateFns.format(prevW, "DD MMM YYYY")})    
  }
  componentDidMount() {
    const strtWeek = dateFns.addDays(dateFns.startOfWeek(new Date()), 1);
    this.setState({strtWeek: strtWeek, currentFolder: dateFns.format(strtWeek, "DDMMYYYY"), displayDate:  dateFns.format(strtWeek, "DD MMM YYYY")})
  }

  createTable = () => {
    const { data } = this.props;
    let table = [];

    const wkStart = this.state.currentFolder;
    let bookings = {}
    if(data[wkStart]){
      for (let key in data[wkStart].status) {
        for (let sType in data[wkStart].status[key]) {
          for (let space in data[wkStart].status[key][sType]) {
            if (sType === "normal") {
              if (!bookings[space]) {
                bookings[space] = {};
              }
              bookings[space][key] = data[wkStart].status[key][sType][space];
            } else {
              if (!bookings[sType + " " + space]) {
                bookings[sType + " " + space] = {};
              }
              bookings[sType + " " + space][key] = data[wkStart].status[key][sType][space];
            }
          }
        }
      }
      for (let space in bookings) {
        table.push(
          <TableRow key={space}>
            <TableCell>{space}</TableCell>
            <TableCell>{bookings[space].mon}</TableCell>
            <TableCell>{bookings[space].tue}</TableCell>
            <TableCell>{bookings[space].wed}</TableCell>
            <TableCell>{bookings[space].thu}</TableCell>
            <TableCell>{bookings[space].fri}</TableCell>
          </TableRow>
        )
      }
    }else{
      table.push(
        <TableRow key="no">
          <TableCell colSpan={6}> Not Available!</TableCell>
        </TableRow>
      )
    }
    return table
  }
  render() {
    const { data } = this.props;
    if (data) {
      console.log();
    }
    return (
      <Grid container key="report">
        <Grid item xs={12}>
          <this.weekNav />
          {data &&
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>MON</TableCell>
                  <TableCell>TUE</TableCell>
                  <TableCell>WED</TableCell>
                  <TableCell>THU</TableCell>
                  <TableCell>FRI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.createTable()}
              </TableBody>
            </Table>
          }
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Report);