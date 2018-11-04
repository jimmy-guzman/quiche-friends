import React, { PureComponent } from 'react'
import { allPropositions } from '../utils/api'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class Home extends PureComponent {
  state = {
    propostions: []
  }

  componentDidMount() {
    this.fetchAllPropositions()
  }

  async fetchAllPropositions() {
    const response = await allPropositions()
    const propostions = response.map(r => ({ data: r.data, id: r.ts }))

    this.setState({ propostions })
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
                    <Typography variant="headline" component="h2">
                      {data.title}
                    </Typography>
                    <Typography component="h3">{`${data.city}, ${data.state}, ${
                      data.country
                    }`}</Typography>
                    <Typography component="p">{data.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Poll</Button>
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
