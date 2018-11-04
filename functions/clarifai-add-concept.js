import Clarifai from 'clarifai'

let app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY })

exports.handler = async function(event, context, callback) {
  if (event.httpMethod === 'POST') {
    const conceptID = event.body
    const model = await app.models.get('faces')
    console.log('app model', model)
    return await model.mergeConcepts({ id: conceptID }).then(response => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    })
  }
}
