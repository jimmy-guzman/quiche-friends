import React, { PureComponent } from 'react'
import { getLocation, searchPropositions } from '../utils/api'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class Home extends PureComponent {
  state = {
    propostions: [],
    userLocation: {}
  }

  componentDidMount() {
    this.setUserLocation().then(() => this.fetchAllPropositions())
  }

  async fetchAllPropositions() {
    const response = await searchPropositions({ city: this.state.userLocation.city })

    const propostions = response.map(r => ({ data: r.data, id: r.ref['@ref'].id }))

    this.setState({ propostions })
  }

  async setUserLocation() {
    const response = await getLocation()
    this.setState({ userLocation: response })
  }

  render() {
    const { propostions } = this.state

    return (
      <Grid container spacing={40}>
        {propostions.map(
          ({ data, id }) =>
            data && (
              <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {data.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">{`${data.city}, ${
                      data.state
                    }, ${data.country}`}</Typography>
                    <Typography variant="subtitle1" paragraph>
                      {data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={`/proposition/${id}`}>
                      View Proposition
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    )
  }
}

export default Home
