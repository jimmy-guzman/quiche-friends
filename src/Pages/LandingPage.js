import React, { Component } from 'react'
import LoginCamera from '../components/LoginCamera'
import SignupCamera from '../components/SignupCamera'
import FancyLoader from '../components/FancyLoader'

class LandingPage extends Component {
  state = {}

  toggleLogin = () => {
    this.setState(() => {
      return { showLogin: !this.state.showLogin }
    })
  }

  toggleSignup = () => {
    this.setState(() => {
      return { showSignup: !this.state.showSignup }
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

        <button onClick={this.toggleSignup}>Sign Up</button>
        {this.state.showSignup && (
          <SignupCamera
            onSuccess={() => {
              console.log('Successfully signed up!')
            }}
          />
        )}
      </div>
    )
  }
}

export default LandingPage
