import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context, callback) => {
  const query = JSON.parse(event.body)
  console.log('Function `proposition-search` invoked')
  try {
    const response = await client.query(
      q.Paginate(
        q.Union(
          q.Match(q.Index('prop_by_country'), query.country),
          q.Match(q.Index('prop_by_state'), query.state),
          q.Match(q.Index('prop_by_country'), query.county),
          q.Match(q.Index('prop_by_city'), query.city)
        )
      )
    )
    // create new query out of comment refs. http://bit.ly/2LG3MLg
    const propositionsQuery = response.data.map(ref => q.Get(ref))
    const propositions = await client.query(propositionsQuery)
    return {
      statusCode: 200,
      body: JSON.stringify(propositions)
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
