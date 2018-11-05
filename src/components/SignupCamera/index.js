import React from 'react'
import * as api from '../../utils/api'
import styles from './styles.css'
import _ from 'lodash'
import uuid from 'uuidv4'
import FancyLoader from '../FancyLoader'

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

const MAX_IMAGES = 10

export default class Selfie extends React.Component {
  state = {
    imageCount: 0,
    signupStarted: false,
    conceptID: null
  }

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

  startSignup = async () => {
    const conceptID = uuid()
    this.setState({ error: false, conceptID })
    const { canvas, video } = this
    canvas.getContext('2d').drawImage(video, 0, 0)
    const dataURL = canvas.toDataURL()
    const blob = dataURLtoBlob(dataURL)
    const imageURL = await api.cloudinaryUpload(blob)
    const matchingConcept = await api.clarifaiPredict(imageURL).then(response => {
      console.log('clarifai predict', response)
      const concepts = _.get(response, 'outputs[0].data.regions[0].data.face.identity.concepts')
      console.log('concepts', concepts)
      const matchingConcept = concepts.find(concept => {
        return concept.value > 0.8
      })
      return matchingConcept
    })
    if (matchingConcept) {
      return this.setState({ error: 'Your face is already taken!' })
    }
    await api.clarifaiAddConcept(conceptID)
    await this.uploadSnapshot()
  }

  uploadSnapshot = async () => {
    const { canvas, video } = this
    const { conceptID } = this.state
    canvas.getContext('2d').drawImage(video, 0, 0)
    const dataURL = canvas.toDataURL()
    const blob = dataURLtoBlob(dataURL)
    this.setState({ signupStarted: true, error: false })
    try {
      const imageURL = await api.cloudinaryUpload(blob)
      return await api.clarifaiAddImage({ imageURL, conceptID }).then(() => {
        const { imageCount } = this.state
        if (imageCount > MAX_IMAGES) {
          return api.clarifaiTrain().then(() => {
            this.setState({
              profileImage: imageURL,
              signupDone: true,
              signupStarted: false,
              error: false
            })
            this.props.onSignupSuccess(this.state)
          })
        }
        this.setState(() => {
          return {
            imageCount: this.state.imageCount + 1
          }
        })
        setTimeout(this.uploadSnapshot, 250)
      })
    } catch (e) {
      this.setState({ error: true })
    }
  }

  render() {
    const { imageCount, signupStarted } = this.state
    return (
      <div className="selfie-container" style={{ color: 'black' }}>
        <video
          onClick={this.takeSelfie}
          width={300}
          height={300}
          autoPlay
          ref={node => (this.video = node)}
        />
        <p style={{ color: 'black' }}>
          We need to get multiple angles of your face to make this work. Please turn your face
          around until the process is complete. :)
        </p>
        {!this.state.signupStarted && <button onClick={this.startSignup}>Start Sign Up</button>}
        {typeof this.state.error === 'string' && <div>{this.state.error}</div>}
        {this.state.error && <div>Something went wrong. Please try again.</div>}
        <canvas
          width={1280}
          height={720}
          style={{ display: 'none' }}
          ref={node => (this.canvas = node)}
        />
        {signupStarted && (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {Array(this.state.imageCount)
              .fill(true)
              .filter(Boolean)
              .map((_, index) => {
                return (
                  <span key={index} style={{ marginRight: 10 }}>
                    ✅
                  </span>
                )
              })}
          </div>
        )}
        {signupStarted && (
          <p style={{ color: 'black' }}>
            {imageCount + 1}/{MAX_IMAGES + 2}
          </p>
        )}
        {this.state.signupStarted && (
          <div style={{ height: 50, width: '100%' }}>
            <FancyLoader num={2} />
          </div>
        )}
        {this.state.signupDone && <h2 style={{ color: 'black' }}>DONE!</h2>}
      </div>
    )
  }
}
