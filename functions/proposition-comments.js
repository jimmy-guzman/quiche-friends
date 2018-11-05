import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context, callback) => {
  const query = JSON.parse(event.body)
  console.log('Function `proposition-comments` invoked')
  try {
    const response = await client.query(
      q.Paginate(q.Match(q.Index('comment_by_prop'), query.propositionId))
    )
    // create new query out of comment refs. http://bit.ly/2LG3MLg
    const getCommentsForPostQuery = response.data.map(ref => q.Get(ref))
    const comments = await client.query(getCommentsForPostQuery)
    return {
      statusCode: 200,
      body: JSON.stringify(comments)
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
