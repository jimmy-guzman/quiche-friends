import React, { Component } from 'react'
import LoginCamera from '../components/LoginCamera'
import FancyLoader from '../components/FancyLoader'

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
        {this.state.showLogin && <LoginCamera onMatchFound={() => {}} onMatchNotFound={() => {}} />}
        <div style={{ height: 50, width: '100%' }}>
          <FancyLoader num={2} />
        </div>
      </div>
    )
  }
}

export default LandingPage
