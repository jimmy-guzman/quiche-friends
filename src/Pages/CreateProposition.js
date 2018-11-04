import React, { Component } from 'react'
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
  render() {
    return <Form handleChange={this.handleChange} {...this.state} />
  }
}

export default CreateProposition
