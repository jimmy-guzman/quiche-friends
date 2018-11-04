import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getProposition, getPropositionComments } from '../utils/api'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Proposition extends Component {
  state = {
    proposition: {
      title: "Loading",
      description: ""
    },
    comments: []
  }

  async componentDidMount() {
    const { propositionId } = this.props;
    const proposition = await getProposition(propositionId);
    const comments = await getPropositionComments(propositionId);
    this.setState({
      proposition,
      comments
    });

  }

  render() {
    const { classes } = this.props;
    const { proposition, comments } = this.state;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            {proposition.title}
          </Typography>
          <Typography component="p">
            {proposition.description}
          </Typography>
        </Paper>
        <ul>
          {comments.map(c => <li>{c.text}</li>)}
        </ul>
      </div>
    );
  }
}

Proposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Proposition)
