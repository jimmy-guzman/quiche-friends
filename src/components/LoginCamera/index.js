import React from 'react'
import * as api from '../../utils/api'
import styles from './styles.css'
import _ from 'lodash'

const dataURLtoBlob = dataURL => {
  let binary = atob(dataURL.split(',')[1])
  let array = []
  let i = 0
  while (i < binary.length) {
    array.push(binary.charCodeAt(i))
    i++
  }
  return new Blob([new Uint8Array(array)], { type: 'application/octet-stream' })
}

export default class Selfie extends React.Component {
  state = {}

  componentDidMount() {
    this.startCamera()
  }

  startCamera = () => {
    this.setState({ isVideoStarted: true })
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => {
        this.video.srcObject = stream
      })
  }

  takeSelfie = async () => {
    const { canvas, video } = this
    canvas.getContext('2d').drawImage(video, 0, 0)
    const dataURL = canvas.toDataURL()
    const blob = dataURLtoBlob(dataURL)
    this.setState({ error: false })
    await api
      .cloudinaryUpload(blob)
      .then(url => {
        return api.clarifaiPredict(url)
      })
      .then(response => {
        console.log('clarifai predict', response)
        const concepts = _.get(response, 'outputs[0].data.regions[0].data.face.identity.concepts')
        console.log('concepts', concepts)

        const matchingConcept = concepts.find(concept => {
          return concept.value > 0.9
        })
        if (matchingConcept) {
          return this.props.onMatchFound(matchingConcept.id)
        } else {
          return this.props.onMatchNotFound(concepts)
        }
      })
      .catch(err => {
        console.log('lambda err', err)
        this.setState({ error: true })
        return err
      })
  }

  render() {
    return (
      <div className="selfie-container">
        <video
          onClick={this.takeSelfie}
          width={300}
          height={300}
          autoPlay
          ref={node => (this.video = node)}
        />
        <button onClick={this.takeSelfie}>{'Take Selfie'}</button>
        {this.state.error && <div>Something went wrong. Please try again.</div>}
        <canvas
          width={1280}
          height={720}
          style={{ display: 'none' }}
          ref={node => (this.canvas = node)}
        />
      </div>
    )
  }
}
