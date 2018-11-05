import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context, callback) => {
  const query = JSON.parse(event.body)
  console.log('Function `user-login` invoked', query)
  try {
    const response = await client.query(q.Paginate(q.Match(q.Index('user_by_uuid'), query.uuid)))
    // create new query out of comment refs. http://bit.ly/2LG3MLg
    const usersForUUID = response.data.map(ref => q.Get(ref))
    const users = await client.query(usersForUUID)
    return {
      statusCode: 200,
      body: JSON.stringify(users[0])
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
