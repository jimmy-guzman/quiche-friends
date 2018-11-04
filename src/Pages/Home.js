import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Home = () => {
  return (
    <Grid container spacing={40}>
      {[
        'proposal one',
        'proposal two',
        'proposal three',
        'proposal four',
        'proposal five',
        'proposal six',
        'proposal seven',
        'proposal eight'
      ].map(proposal => (
        <Grid item key={proposal} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="headline" component="h2">
                {proposal}
              </Typography>
              <Typography component="p">description</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
