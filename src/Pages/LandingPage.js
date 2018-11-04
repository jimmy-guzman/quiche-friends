import React, { Component } from 'react'
import LoginCamera from '../components/LoginCamera'
import FancyLoader from '../components/FancyLoader'

class LandingPage extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.startCamera
  }

  toggleLogin = () => {
    this.setState(() => {
      return { showLogin: !this.state.showLogin }
    })
  }


  render() {
    if (!this.state.loading) {
      return (
        <div style={{ height: 50, width: '50%' }}>
          <FancyLoader num={2} />
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.toggleLogin}>Log In</button>
          {this.state.showLogin && <LoginCamera onMatchFound={() => {}} onMatchNotFound={() => {}} />}
        </div>
      )

    }
  }
}

export default LandingPage
