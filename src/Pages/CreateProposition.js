import React, { Component } from 'react'

import { createProposition } from '../utils/api'
import { Form } from '../components/Form'
class CreateProposition extends Component {
  state = {
    title: 'Title',
    description: 'Description',
    pollOptions: 'Poll Options',
    country: 'Country',
    state: 'State',
    city: 'City'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    createProposition({ ...this.state })
  }

  render() {
    return (
      <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} {...this.state} />
    )
  }
}

export default CreateProposition
