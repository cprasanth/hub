import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';

const styles = theme => {
  return ({

  })
};

class Report extends Component {
  createTable = () => {
    const { data } = this.props;
    let table = []
    let header = []

    for(let key in data["05112018"].status) {

      let children = [];

      for(let sType in data["05112018"].status[key]) {

        header.push(<TableCell key={sType}>{sType}</TableCell>);

        for(let space in data["05112018"].status[key][sType]) {
          children.push(<TableCell key={sType}>{data["05112018"].status[key][sType][space]}</TableCell>);
        }
      }

      table.push(<TableRow key={key}>
        <TableCell>{key}</TableCell>
          {children}
        </TableRow>)
    }
    return table
  }
  createHeader = () => {
    const { data } = this.props;
    let table = [];
    let children = [];
    for(let sType in data["05112018"].status.mon) {
      for(let space in data["05112018"].status.mon[sType]) {
        children.push(<TableCell key={sType}>{`${sType} ${space}`}</TableCell>);
      }
    }


    table.push(<TableRow>
        <TableCell>Day</TableCell>
        {children}
      </TableRow>)
    return table
  }
  render() {
    const { classes, data } = this.props;
    if (data) {
      console.log();
    }
    return (
      <Grid container key="report">
        <Grid item xs={12}>
          {data &&
            <Table>
              <TableHead>
                {this.createHeader()}
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