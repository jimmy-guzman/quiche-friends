/* Api methods to call /functions */

export const createProposition = (data) => {
  return fetch('/.netlify/functions/proposition-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createComment = (data) => {
  return fetch('/.netlify/functions/comment-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createVote = (data) => {
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
