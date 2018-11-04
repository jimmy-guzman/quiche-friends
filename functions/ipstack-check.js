
exports.handler = () => {
    fetch('http://api.ipstack.com/check?access_key=IPSTACK_API_KEY&format=1')
      .then(function(response) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(response)
        })
      })
}