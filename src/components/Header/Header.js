import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/signup">
          <AccountCircle color="inherit" />
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
