import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  try {
    /* parse the string body into a useable JS object */
    const proposition = JSON.parse(event.body);
    proposition.createdAt = Date.now();
    console.log('proposition-create invoked', proposition);

    /* construct the fauna query */
    const response = await client.query(q.Create(q.Ref('classes/propositions'), { data: proposition }));
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch(err) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  };
}
