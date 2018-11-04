Proposition 
-----------

```js
{
  title: "It's a new idea!",
  description: "140 characters is bad for your brain.",
  country: "US",
  state: "California",
  county: "San Francisco",
  city: "San Francisco",
  isElection: false,
  poll: {
    "Delete Twitter": 0, // votes aggregated on insert
    "Twitter for Life": 0 // votes aggregated on insert
  }
  geolocation: {} // for when it was createdc
}
```

Comment 
-------

```js
{
  text: "Some really long string of text...",
  propositionId: id of the proposition this comment belongs to,
  userId: id of the user writing the comment,
  createdAt: timestamp,
  geolocation: IPStack geolocation info
}
```

Vote 
-------

```js
{
  choice: "Text of the choice this person voted for",
  propositionId: id of the proposition this comment belongs to,
  userId: id of the user writing the comment,
  createdAt: timestamp,
  geolocation: IPStack geolocation info
}
```

User 
----

```js
{
  id: really long number,
  name: "Mr. Miyagi",
  country: "US",
  state: "California",
  county: "San Francisco",
  city: "San Francisco",
  logins: [
    ... array of all detected geolocation
  ]
}
```