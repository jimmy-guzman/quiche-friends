import React, { Component } from 'react'
import LoginCamera from '../components/LoginCamera'
import SignupCamera from '../components/SignupCamera'
import FancyLoader from '../components/FancyLoader'
import * as api from '../utils/api'
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
            onSignupSuccess={state => {
              api
                .userCreate({
                  conceptID: state.conceptID,
                  profileImage: state.profileImage
                })
                .then(response => {
                  console.log('userLogin good!', response)
                })
            }}
          />
        )}
      </div>
    )
  }
}

export default LandingPage
