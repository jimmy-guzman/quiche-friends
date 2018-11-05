import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import LoginSignup from '../components/LoginSignup'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: '#0D47A1',
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 0,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  signUpCard: {
    marginLeft: 200,
    marginRight: `${theme.spacing.unit * 6}px`,
    marginTop: `${theme.spacing.unit * 6}px`,
    marginBottom: `${theme.spacing.unit * 6}px`,
    maxWidth: 345,
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: 'cover',
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
    backgroundColor: "#fff",
  },
  cardDetails: {
    // backgroundColor: '#0D47A1',
    border: "1px solid #0D47A1",
    borderRadius: 6,
    color: 'white !important',
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  signUpButton: {
    width: "100%"
  },
  cardGrid: {
    justifyContent: "stretch",
    alignItems: "stretch"
  }
});

const featuredPosts = [
  {
    title: 'View Election Info',
    description:
    'Learn about the issues being voted on in your area locally, state-wide, and country-wide. Find out what your neighbors think. Discuss.',
  },
  {
    title: 'Contact Your Representatives',
    description:
    'Email your senators and congresspeople to let them know what matters to you. Point them to discussions happening now they should pay attention to.',
  },
];

class LandingPage extends Component {
  state = {}

  toggleLogin = () => {
    this.setState(() => {
      return { showLogin: !this.state.showLogin, showSignup: false }
    })
  }

  toggleSignup = () => {
    this.setState(() => {
      return { showSignup: !this.state.showSignup, showLogin: false }
    })
  }
  render() {
    const { classes } = this.props;
  
  return (
    <React.Fragment>
    <CssBaseline />
    <div className={classes.layout}>
    <Toolbar className={classes.toolbarMain}>
    {/* <Button size="small">Subscribe</Button> */}
    <Typography
    component="h2"
    variant="h5"
    color="inherit"
    align="center"
    noWrap
    className={classes.toolbarTitle}
    >
    Face to Face
    </Typography>
    {/* <Button variant="outlined" size="small" onClick={this.toggleLogin}>
    Log In
    </Button> */}
    </Toolbar>
    <main>
    {/* Main featured post */}
    <Paper className={classes.mainFeaturedPost}>
    <Grid container>
    <Grid item md={6}>
    <div className={classes.mainFeaturedPostContent}>
    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
    Real Issues.<br/>
    Real People.<br/>
    Real Discussions.
    
    </Typography>
    <Typography variant="h5" color="inherit" paragraph>
    With our face identification &amp; geolocation technology, you take comfort in the fact that you&apos;re taking part in real discussions with real people - not foreign bots. 
    
    </Typography>
    </div>
    </Grid>
    
    <Grid item md={6}>
    <Card className={classes.signUpCard}>
    <div>
    { !this.state.showLogin && !this.state.showSignup ? 
        <CardMedia
          component="img"
          alt="Face Scanning"
          className={classes.media}
          height="140"
          image="https://www.techfunnel.com/wp-content/uploads/2018/03/Facial-Recognition-Technology-Pros-and-Cons.jpg"
          title="Face Scanning"
          /> : null
    }
    <CardContent>
    { !this.state.showLogin && !this.state.showSignup ? 
        <Typography gutterBottom variant="h6" component="h2">
        Complete your signup with a scan of your face.
        </Typography>
     : null
    }

    <LoginSignup history={this.props.history} />
    {/* <Typography component="p">
    </Typography>  */}
    </CardContent>
    </div>
    <CardActions>
    {/* <Button size="small" color="primary">
    Learn More
    </Button> */}
    </CardActions>
    </Card>  
  
  </Grid>
  </Grid>
  </Paper>
  {/* End main featured post */}
  {/* Sub featured posts */}
  <Grid container spacing={40} className={classes.cardGrid}>
  {featuredPosts.map(post => (
    <Grid item key={post.title} xs={12} md={6}>
    <Card className={classes.card}>
    <div className={classes.cardDetails}>
    <CardContent>
    <Typography component="h2" variant="h5">
    {post.title}
    </Typography>
    <Typography variant="subtitle1" color="white">
    {post.date}
    </Typography>
    <Typography variant="subtitle1" paragraph>
    {post.description}
    </Typography>
    {/* <Typography variant="subtitle1" color="primary">
    Continue reading...
    </Typography> */}
    </CardContent>
    </div>
    <Hidden xsDown>
    <CardMedia
    className={classes.cardMedia}
    />
    </Hidden>
    </Card>
    </Grid>
    ))}
    </Grid>
    {/* End sub featured posts */}
    <Grid container spacing={40} className={classes.mainGrid}>
    {/* Main content */}
    <Grid item xs={12} md={8}>
    <Typography variant="h6" gutterBottom>
      One Human One Account: How does it work?
    </Typography>
    <Divider />
      When you are discussing issues with people, wherever they live and whatever their background,
      you want to know you are collaborating with a real human. Progress on all the things we care about as humans depends on our ability to work together to solve problems.
      This breaks down when our conversations are interrupted by paid trolls or overrun by automated bots. By only allowing login with your face, and continuing to
      improve our face id technology we ensure that bad behavior is minimized and real people are heard in the conversations. If your only goal is to manipulate
      and hack our brains... we'll ban your face!
    </Grid>
    {/* End main content */}
    {/* Sidebar */}
    <Grid item xs={12} md={4}>
    <Paper elevation={0} className={classes.sidebarAboutBox}>
    <Typography variant="h6" gutterBottom>
    About
    </Typography>
    <Typography>
    Made with ❤️ (and hope for the future) at the 2018 JAMStack/ FreeCodeCamp hackathon by: <br /> @ianserlin @jimmy-guzman @jsadsad @kvrmd @lelelew @nesanime<br />
    <br />
    Special thanks to the following tech partners:
    <ul>Netlify</ul>
    <ul>Clarifai</ul>
    <ul>Formspree</ul>
    <ul>Fauna</ul>
    </Typography>
    </Paper>



    </Grid>
    {/* End sidebar */}
    </Grid>
    </main>
    </div>
    {/* Footer */}
    {/* <footer className={classes.footer}>
    <Typography variant="h6" align="center" gutterBottom>
    Footer
    </Typography>
    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
    Something here to give the footer a purpose!
    </Typography>
    </footer> */}
    {/* End footer */}
    </React.Fragment>
    );
  }
}


export default withStyles(styles)(LandingPage);