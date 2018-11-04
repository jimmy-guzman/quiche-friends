import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

class TextFields extends React.Component {
  state = {
    title: 'Title',
    description: 'Description',
    pollOptions: 'Poll Options',
    country: 'Country',
    state: 'State',
    city: 'City'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
        />
        <TextField
          label="Description"
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange('description')}
          margin="normal"
        />
        <TextField
          label="Poll Options"
          className={classes.textField}
          value={this.state.pollOptions}
          onChange={this.handleChange('pollOptions')}
          margin="normal"
        />
        <TextField
          label="Country"
          className={classes.textField}
          value={this.state.country}
          onChange={this.handleChange('country')}
          margin="normal"
        />
        <TextField
          label="State"
          className={classes.textField}
          value={this.state.state}
          onChange={this.handleChange('state')}
          margin="normal"
        />
        <TextField
          label="Title"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
        />
      </form>
    )
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextFields)
