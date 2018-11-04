import React, { Component } from 'react'
import LoginCamera from '../components/LoginCamera'

class LandingPage extends Component {
  state = {}

  toggleLogin = () => {
    this.setState(() => {
      return { showLogin: !this.state.showLogin }
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.toggleLogin}>Log In</button>
        {this.state.showLogin && <LoginCamera />}
      </div>
    )
  }
}

export default LandingPage
