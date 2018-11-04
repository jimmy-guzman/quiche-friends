/* bootstrap database in your FaunaDB account */
const readline = require('readline')
const faunadb = require('faunadb')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log('No FAUNADB_SERVER_SECRET found')
  console.log('Please run `netlify addons:create fauna-staging` and redeploy')
  return false
}

async function bootstrap() {
  console.log(chalk.cyan('Creating your FaunaDB Database...\n'))
  if (insideNetlify) {
    // Run idempotent database creation
    await createFaunaDB(process.env.FAUNADB_SERVER_SECRET);
    console.log('Database created');
  } else {
    console.log()
    console.log('You can create fauna DB keys here: https://dashboard.fauna.com/db/keys')
    console.log()
    ask(chalk.bold('Enter your faunaDB server key'), async (err, answer) => {
      if (err) {
        console.log(err)
      }
      if (!answer) {
        console.log('Please supply a faunaDB server key')
        process.exit(1)
      }
      await createFaunaDB(process.env.FAUNADB_SERVER_SECRET);
      console.log('Database created');
    })
  }
}

/* idempotent operation */
async function createFaunaDB(key) {
  console.log('Create the database!')
  const client = new faunadb.Client({
    secret: key
  })

  // Create Tables
  await client.query(q.Create(q.Ref('classes'), { name: 'users' }));
  await client.query(q.Create(q.Ref('classes'), { name: 'propositions' }));
  await client.query(q.Create(q.Ref('classes'), { name: 'votes' }));
  await client.query(q.Create(q.Ref('classes'), { name: 'comments' }));

  // Create Indexes
  await client.query(q.Create(q.Ref('indexes'), {
    name: 'prop_by_country',
    source: q.Ref('classes/propositions'),
    terms: [{ field: ["data", "country"] }]
  }));
  await client.query(q.Create(q.Ref('indexes'), {
    name: 'prop_by_state',
    source: q.Ref('classes/propositions'),
    terms: [{ field: ["data", "state"] }]
  }));
  await client.query(q.Create(q.Ref('indexes'), {
    name: 'prop_by_county',
    source: q.Ref('classes/propositions'),
    terms: [{ field: ["data", "county"] }]
  }));
  await client.query(q.Create(q.Ref('indexes'), {
    name: 'prop_by_city',
    source: q.Ref('classes/propositions'),
    terms: [{ field: ["data", "city"] }]
  }));
  await client.query(q.Create(q.Ref('indexes'), {
    name: 'prop_by_is_election',
    source: q.Ref('classes/propositions'),
    terms: [{ field: ["data", "isElection"] }]
  }));

  await client.query(q.Create(q.Ref('indexes'), {
    name: 'user_by_uuid',
    source: q.Ref('classes/users'),
    terms: [{ field: ["data", "uuid"] }]
  }));

  await client.query(q.Create(q.Ref('indexes'), {
    name: 'comment_by_prop',
    source: q.Ref('classes/comments'),
    terms: [{ field: ["data", "propositionId"] }]
  }));

  await client.query(q.Create(q.Ref('indexes'), {
    name: 'vote_by_prop',
    source: q.Ref('classes/votes'),
    terms: [{ field: ["data", "propositionId"] }]
  }));

}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(question + '\n', function(answer) {
    rl.close()
    callback(null, answer)
  })
}

bootstrap();