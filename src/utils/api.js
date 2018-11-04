/* Api methods to call /functions */

let currentLocation;
const IPSTACK_API_KEY = '7e9a9d0b23a735947e564fd07d356803'

async function getLocation() {
  const response = await fetch(`http://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}&format=1`)
  currentLocation = await response.json();
}

// save location in startup
getLocation();

export const createProposition = (data) => {
  data.geolocation = currentLocation;
  return fetch('/.netlify/functions/proposition-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createComment = (data) => {
  data.geolocation = currentLocation;
  return fetch('/.netlify/functions/comment-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createVote = (data) => {
  data.geolocation = currentLocation;
  return fetch('/.netlify/functions/vote-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const getProposition = () => {
  return fetch('/.netlify/functions/proposition-read').then((response) => {
    return response.json()
  })
}

export const allPropositions = () => {
  return fetch('/.netlify/functions/propositions-all').then((response) => {
    return response.json()
  })
}

export const searchPropositions = (query) => {
  return fetch('/.netlify/functions/propositions-search', {
    body: JSON.stringify(query),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}