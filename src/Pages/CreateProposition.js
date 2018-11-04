import React, { Component } from 'react'

import { createProposition, getLocation } from '../utils/api'
import { Form } from '../components/Form'
class CreateProposition extends Component {
  state = {
    title: '',
    description: '',
    pollOptionOne: '',
    pollOptionTwo: '',
    isElection: false,
    country: '',
    county: '',
    state: '',
    city: '',
    geolocation: {}
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  componentDidMount() {
    this.fetchGeoLocation()
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title, description, country, state, county, isElection, city, geolocation } = this.state
    const data = {
      title,
      description,
      country,
      state,
      county,
      city,
      isElection,
      poll: {
        [this.state.pollOptionOne]: 0,
        [this.state.pollOptionTwo]: 0
      },
      geolocation
    }
    createProposition(data)
    this.resetForm()
  }

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      pollOptionOne: '',
      pollOptionTwo: '',
      isElection: false,
      country: '',
      county: '',
      state: '',
      city: ''
    })
  }

  handleIsElectionChange = () => {
    this.setState(prevState => ({
      isElection: !prevState.isElection
    }))
  }

  async fetchGeoLocation() {
    const response = await getLocation()
    this.setState({ geolocation: response })
  }

  render() {
    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleIsElectionChange={this.handleIsElectionChange}
        {...this.state}
      />
    )
  }
}

export default CreateProposition
