import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context, callback) => {
  console.log('Function `proposition-comments` invoked')
  try {
    const response = await client.query(q.Paginate(q.Match(q.Ref("indexes/all_propositions"))));
    // create new query out of comment refs. http://bit.ly/2LG3MLg
    const propositionsQuery = response.data.map(ref => q.Get(ref));
    const propositions = await client.query(propositionsQuery);
    return {
      statusCode: 200,
      body: JSON.stringify(propositions)
    };
  } catch(error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }

}
