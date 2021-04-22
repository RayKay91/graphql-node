const { ApolloServer } = require( 'apollo-server' )
// type defs defines the GraphQL Schema.
const typeDefs = `
type Query {
    info: String!
}
`
// resolvers is the implementation of the GQL schema. The structure is identical to the structure of the type definition. What the function returns is what will be sent to the client.
const resolvers = {
    Query: {
        info: () => null
    }
}

const server = new ApolloServer( {
    typeDefs,
    resolvers
} )

server.listen().then( ( { url } ) => console.log( `server is running on ${ url }` ) )