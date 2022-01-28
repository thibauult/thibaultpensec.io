import * as prismic from '@prismicio/client'

// Create a client
export const repositoryName = 'thibaultpensec'
const endpoint = prismic.getEndpoint(repositoryName)
export const client = prismic.createClient(endpoint, {

    routes: [
        {
            type: "home",
            path: "/"
        },
        {
            type: "experience",
            path: "/experience/:uid",
        }
    ]
})