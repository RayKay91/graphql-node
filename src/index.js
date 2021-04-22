const { ApolloServer } = require( 'apollo-server' )
const fs = require( 'fs' )
const path = require( 'path' )


//dummy data
let links = [ {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
} ]

let idCount = links.length
// adding a new resolver for the feed root field. The resolver should be named exactly the same as the corresponding field from the schema definition.
const resolvers = {
    Query: {
        info: () => null,
        feed: () => links
    },
    Link: {
        id: ( parent ) => parent.id,
        description: ( parent ) => { console.log( parent ); return parent.description },
        url: parent => parent.url
    },
    Mutation: {
        post: ( parent, args ) => {
            const link = {
                id: `link-${ idCount++ }`,
                description: args.description,
                url: args.url
            }
            links.push( link )
            return link
        }
    }
}

const server = new ApolloServer( {
    typeDefs: fs.readFileSync( path.join( __dirname, 'schema.graphql' ), { encoding: 'utf8' } ),
    resolvers
} )

server.listen().then( ( { url } ) => console.log( `server is running on ${ url }` ) )