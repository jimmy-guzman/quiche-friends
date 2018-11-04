import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Main from './Main'
import { Header } from './components/Header'

import Grid from '@material-ui/core/Grid'

import './App.css'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    marginTop: theme.spacing.unit * 4
  }
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="app">
        <Header />
        <div className={classNames(classes.layout)}>
          <Grid container>
            <Main />
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
