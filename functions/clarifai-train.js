import Clarifai from 'clarifai'

let app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY })

exports.handler = async function(event, context, callback) {
  if (event.httpMethod === 'POST') {
    return await app.models.train('faces').then(response => {
      console.log('clarifai train', response)
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    })
  }
}
