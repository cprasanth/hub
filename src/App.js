import React from 'react';
import { Router } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';
import createHistory from 'history/createBrowserHistory';

import { connect } from 'react-firebase';
import Home from './Home';
import Report from './Report';
import Login from './Login';

const history = createHistory();

const theme = createMuiTheme({
  palette: {
    typography: {
      useNextVariants: true,
    },
    primary: {
      light: '#4DC0BA',
      main: '#005A84',
      dark: '#07A5DC',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#F1F1F1',
      main: '#4DC0BA',
      dark: '#D5E2ED',
      contrastText: '#fff',
    },
    background: {
      default: '#f3f4f5'
    }
  },
});

const App = ({ value, addReservation, removeReservation }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={(match) => <Home history={history} data={value} addReservation={addReservation} removeReservation={removeReservation} />} />
          <Route path="/report" exact render={(match) => <Report history={history} data={value} />} />
          <Route path="/login" render={(match) => <Login history={history} data={value} />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

firebase.initializeApp({
  databaseURL: "https://booking-8cc58.firebaseio.com",
})


const mapFirebaseToProps = (props, ref) => ({
  value: 'atkins/infra',
  addReservation: (folder, day, val) => ref(`atkins/infra/${folder}/requests/${day}`).push(val),
  removeReservation: (folder, day, user) => ref(`atkins/infra/${folder}/requests/${day}`).orderByValue().equalTo(user).on('child_added', function(snapshot) {
    snapshot.getRef().remove().then(
      ()=>{
        window.location.reload()
      }
    )
    
  })
})
 
export default connect(mapFirebaseToProps)(App)
