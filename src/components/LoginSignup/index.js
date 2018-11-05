import React, { Component } from 'react'
import LoginCamera from '../LoginCamera'
import SignupCamera from '../SignupCamera'
import * as api from '../../utils/api'
import Button from '@material-ui/core/Button'

class LoginSignup extends Component {
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
        <Button onClick={this.toggleLogin} size="medium" color="secondary" variant="outlined">
          Login
        </Button>
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

        <Button onClick={this.toggleSignup} size="medium" color="secondary" variant="outlined">
          Sign Up With Your Face
        </Button>
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

export default LoginSignup
