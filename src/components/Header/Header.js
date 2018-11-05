import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10,
    width: 40,
    height: 40
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
}

class Header extends React.Component {
  render() {
    const { classes } = this.props
    const user = localStorage.getItem('user')
    const userData = user && JSON.parse(user)
    const avatarSrc = _.get(userData, 'data.profileImage')
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            {avatarSrc ? (
              <img src={avatarSrc} className={classes.avatar} />
            ) : (
              <AccountCircle color="inherit" />
            )}
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
