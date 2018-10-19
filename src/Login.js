import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


const styles = theme => {
  return ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 320,
    },
  })
};

class Login extends Component {
  state = {
    username: '',
  };
  componentDidMount() {
    localStorage.removeItem('user');
  }
  doLogin = () => {
    localStorage.setItem("user", this.state.username);
    this.props.history.push('/')
  }
  handleChange = event => {
    this.setState({ "username": event.target.value });
  };
  render() {
    const { classes, data } = this.props;
    return (
      <Grid container key="home">
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="username">Name</InputLabel>
              {data &&
                <Select
                  value={this.state.username}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'username',
                    id: 'username',
                  }}
                >
                  {
                    data.staff.map((val, i) => {
                      return <MenuItem value={val.name}>{val.name}</MenuItem>
                    })
                  }
                </Select>
              }
            </FormControl>
            <Button onClick={this.doLogin}>Login</Button>
          </form>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Login);