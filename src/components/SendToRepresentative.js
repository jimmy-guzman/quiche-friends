import React, { Component } from 'react'
import _isArray from 'lodash/isArray'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  }
})
class SendToRepresentative extends Component {
  state = {
    email: '',
    subject: '',
    message: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { representativeEmail } = this.props
    const ccEmails = _isArray(representativeEmail)
      ? representativeEmail.join(',')
      : representativeEmail
    const currentLocation = window.location.href

    return (
      <form
        action="https://formspree.io/mvqbredx"
        method="POST"
        // ref={this.form}
        // onSubmit={(e)=>this.handleSubmit(e)}
      >
        {/* this should be able to take an array of email addresses and return it as a string separated by commas  */}
        <input type="hidden" name="_cc" value={ccEmails} ref={this._cc} />

        {/* URL should load dynamic URL of page user is on */}
        <input type="hidden" name="_next" value={currentLocation} />

        <TextField
          label="Email"
          className={this.props.classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          name="_replyto"
        />

        {/* should autofill with the issue you are e-mailing about */}

        <TextField
          label="Subject"
          className={this.props.classes.textField}
          value={this.state.subject}
          onChange={this.handleChange('subject')}
          margin="normal"
          name="_subject"
        />

        {/* should autofill with the issue you are e-mailing about */}
        <TextField
          label="message"
          className={this.props.classes.textField}
          value={this.state.message}
          onChange={this.handleChange('message')}
          margin="normal"
          name="message"
        />

        <Button size="small" variant="text" type="submit">
          Send
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SendToRepresentative)
