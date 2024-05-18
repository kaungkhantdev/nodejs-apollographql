import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import typeDefs from "./schema.js";

// input db
import db from './_db.js';

const resolvers = {
    Query: {
        games: () => db.games,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})


const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})


console.log(`🚀  Server ready at: ${url}`);