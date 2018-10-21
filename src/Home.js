import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import ThisWeek from './components/thisWeek';
import NextWeek from './components/nextWeek';

const styles = theme => {
  return ({

  })
};

class Home extends Component {


  componentDidMount() {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      this.setState({ user: cachedUser });
    } else {
      this.props.history.push('/login');
    }
  }

  componentWillUpdate(){
  }
  render() {
    const { classes, data, addReservation } = this.props;
    return (
      <Grid container key="home">
        <Grid item xs={12}>
          {this.state &&
            <React.Fragment>
              <Typography variant="h4">Hello {this.state.user}</Typography>
              <ThisWeek data={data} addReservation={addReservation} />
              <NextWeek data={data} addReservation={addReservation} />
            </React.Fragment>
          }
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Home);