import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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

const Form = ({ classes, handleChange, handleSubmit, handleIsElectionChange, ...formValues }) => (
  <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
    <TextField
      label="Title"
      className={classes.textField}
      value={formValues.title}
      onChange={handleChange('title')}
      margin="normal"
    />
    <TextField
      id="standard-multiline-flexible"
      label="Description"
      multiline
      rowsMax="4"
      fullWidth
      value={formValues.description}
      onChange={handleChange('description')}
      className={classes.textField}
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
      label="City"
      className={classes.textField}
      value={formValues.city}
      onChange={handleChange('city')}
      margin="normal"
    />
    <TextField
      label="County"
      className={classes.textField}
      value={formValues.county}
      onChange={handleChange('county')}
      margin="normal"
    />
    <TextField
      label="Poll Option One"
      className={classes.textField}
      value={formValues.pollOptionOne}
      onChange={handleChange('pollOptionOne')}
      margin="normal"
    />
    <TextField
      label="Poll Option Two"
      className={classes.textField}
      value={formValues.pollOptionTwo}
      onChange={handleChange('pollOptionTwo')}
      margin="normal"
    />
    <FormControlLabel
      control={<Switch checked={formValues.isElection} onChange={handleIsElectionChange} />}
      label="In Upcoming Election?"
    />
    <Button size="small" variant="text" type="submit">
      Create New Proposition
    </Button>
  </form>
)

export default withStyles(styles)(Form)
