import Clarifai from 'clarifai'

let app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY })

exports.handler = async function(event, context, callback) {
  const image = event.body;

  if(image){
    console.log(`got an image`);
  }

  return { 
    statusCode: 200, 
    body: JSON.stringify({
      success: true,
      userId: 'bob'
    })
  };

  // if (event.httpMethod === 'POST') {
  //   return app.models.predict('faces', [{ url: event.body }]).then(res => {
  //     console.log('clarifai res', JSON.stringify(res, null, 4))
  //     callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(res)
  //     })
  //   })
  // }
}
