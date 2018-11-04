import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context, callback) => {
  const query = JSON.parse(event.body);
  console.log(`proposition-read' invoked. Read id: ${query.userId}`)
  try {
    const response = client.query(q.Get(q.Ref(`classes/users/${query.userId}`)));
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch(err) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }
}
