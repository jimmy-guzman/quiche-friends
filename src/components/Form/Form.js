import React from 'react'

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

const Form = ({ classes, handleChange, ...formValues }) => (
  <form className={classes.container} noValidate autoComplete="off">
    <TextField
      label="Title"
      className={classes.textField}
      value={formValues.title}
      onChange={handleChange('title')}
      margin="normal"
    />
    <TextField
      label="Description"
      className={classes.textField}
      value={formValues.description}
      onChange={handleChange('description')}
      margin="normal"
    />
    <TextField
      label="Poll Options"
      className={classes.textField}
      value={formValues.pollOptions}
      onChange={handleChange('pollOptions')}
      margin="normal"
    />
    <TextField
      label="Country"
      className={classes.textField}
      value={formValues.country}
      onChange={handleChange('country')}
      margin="normal"
    />
    <TextField
      label="State"
      className={classes.textField}
      value={formValues.state}
      onChange={handleChange('state')}
      margin="normal"
    />
    <TextField
      label="Title"
      className={classes.textField}
      value={formValues.city}
      onChange={handleChange('city')}
      margin="normal"
    />
  </form>
)

export default withStyles(styles)(Form)
