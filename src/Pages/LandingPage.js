import React, { Component } from 'react'
import LoginCamera from '../components/LoginCamera'
import SignupCamera from '../components/SignupCamera'
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
        {this.state.showLogin && (
          <LoginCamera
            onMatchFound={conceptID => {
              this.setState({ error: false })
              api.userLogin(conceptID).then(response => {
                localStorage.setItem('user', response)
                this.props.history.push('/home')
              })
            }}
            onMatchNotFound={() => {
              this.setState({ error: 'Your face was not found!' })
            }}
          />
        )}
        {this.state.error && <h1>{this.state.error}</h1>}

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
                  localStorage.setItem('user', response)
                  this.props.history.push('/home')
                })
            }}
          />
        )}
      </div>
    )
  }
}

export default LandingPage
