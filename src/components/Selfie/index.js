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

  takeSelfie = () => {
    const { canvas, video } = this
    canvas.getContext('2d').drawImage(video, 0, 0)
    const dataURL = canvas.toDataURL()
    const blob = dataURLtoBlob(dataURL)
    api
      .cloudinaryUpload(blob)
      .then(url => {
        return api.clarifaiPredict(url)
      })
      .then(response => {
        console.log('clarifai predict', response)
        const concepts = _.get(response, 'outputs[0].data.regions[0].data.face.identity.concepts')
        console.log('concepts', concepts)
      })
      .catch(err => {
        console.log('lambda err', err)
      })
  }

  render() {
    const { isVideoStarted } = this.state
    return (
      <div className="selfie-container">
        <video
          onClick={isVideoStarted ? this.takeSelfie : this.startCamera}
          width={300}
          height={300}
          autoPlay
          ref={node => (this.video = node)}
        />
        <button onClick={isVideoStarted ? this.takeSelfie : this.startCamera}>
          {isVideoStarted ? 'Take Selfie' : 'Start Camera'}
        </button>
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
