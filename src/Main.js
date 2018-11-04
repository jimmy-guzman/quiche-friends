import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home, Proposition, SignUp, LandingPage, Create } from './Pages'

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/proposition/create" component={Create} />
          <Route path="/proposition/:id" component={Proposition} />
        </Switch>
      </Fragment>
    )
  }
}

export default Main
