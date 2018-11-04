import Clarifai from 'clarifai'

let app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY })

exports.handler = async function(event, context, callback) {
  if (event.httpMethod === 'POST') {
    const { imageURL, conceptID } = JSON.parse(event.body)
    console.log('Hello world', imageURL, conceptID)
    const imageID = await app.inputs
      .create({ url: imageURL })
      .then(inputs => {
        // console.log('clarifai input', inputs)
        return inputs[0].rawData['id']
      })
      .catch(error => {
        console.log('Error:', error)
      })

    const regionID = await app.inputs.get(imageID).then(input => {
      if (input.regions.length > 1) {
        throw new Error('Do you have 2 faces?')
      } else {
        return input.regions[0].id
      }
    })

    console.log('TRAIN IMAGE', imageID, regionID)
    return await app.inputs
      .update({
        action: 'merge',
        id: imageID,
        regions: [
          {
            id: regionID,
            data: {
              face: {
                identity: {
                  concepts: [{ id: conceptID, value: true }]
                }
              }
            }
          }
        ]
      })
      .then(response => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(response)
        })
      })
  }
}
