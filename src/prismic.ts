import * as prismic from '@prismicio/client'

// Create a client
const repositoryName = 'thibaultpensec'
const endpoint = prismic.getEndpoint(repositoryName)
const client = prismic.createClient(endpoint)

export default client