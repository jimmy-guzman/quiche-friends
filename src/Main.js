import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home, Proposition, SignUp, LandingPage, CreateProposition } from './Pages'

class Main extends Component {
  componentDidMount() {
    localStorage.removeItem('user')
  }
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/proposition/create" component={CreateProposition} />
          <Route path="/proposition/:id" component={Proposition} />
        </Switch>
      </Fragment>
    )
  }
}

export default Main
