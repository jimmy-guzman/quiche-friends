import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import SendToRepresentative from '../components/SendToRepresentative'

import { getProposition, getPropositionComments, createComment } from '../utils/api'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
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

class Proposition extends Component {
  state = {
    proposition: {
      title: 'Loading',
      description: ''
    },
    comments: [],
    newComment: ''
  }

  componentDidMount() {
    const { match } = this.props
    this.setProposition(match.params.id)

    this.setComments(match.params.id)
  }

  async setComments(propositionId) {
    const comments = await getPropositionComments(propositionId)

    this.setState({
      comments,
      newComment: ''
    })
  }

  async setProposition(propositionId) {
    const response = await getProposition(propositionId)
    this.setState({
      proposition: response.data
    })
  }

  handleChange = e => {
    this.setState({ newComment: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    createComment({
      comment: this.state.newComment,
      propositionId: this.props.match.params.id
    }).then(() => this.setComments(this.props.match.params.id))
  }

  render() {
    const { classes } = this.props
    const { proposition, comments } = this.state

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            {proposition.title}
          </Typography>
          <Typography component="p">{proposition.description}</Typography>
        </Paper>
        <List>
          {comments.map(c => (
            <ListItem key={c.ts}>{c.data.comment}</ListItem>
          ))}
        </List>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            label="Comment"
            className={classes.textField}
            value={this.state.newComment}
            onChange={this.handleChange}
            margin="normal"
          />

          <Button size="small" variant="text" type="submit">
            Submit
          </Button>
        </form>
        <SendToRepresentative representativeEmail="senator@feinstein.senate.gov" />
      </div>
    )
  }
}

Proposition.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Proposition)
