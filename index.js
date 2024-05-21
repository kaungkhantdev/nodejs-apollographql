import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import typeDefs from "./schema.js";

// input db
import db from './_db.js';

const resolvers = {
    Query: {
        games: () => db.games,
        authors: () => db.authors,
        reviews: () => db.reviews,
        review: (_, args) => {
            return db.reviews.find((review) => review.id == args.id)
        }
    },
    Review: {
        author: (parent) => {
            return db.authors.find(author => author.id == parent.author_id)
        }
    },
    Game: {
        reviews: (parent) => {
            return db.reviews.filter(review => review.game_id == parent.id)
        },
        author: (parent) => {
            return db.authors.find(author => author.id == parent.author_id)
        }
    },
    Mutation: {
        addAuthor(_, args) {
            let author = args.author;
            db.authors.push(author);
            return author
        },
        deleteAuthor(_, args) {
            db.authors = db.authors.filter(au => au.id != args.id)
            return db.authors
        },
        updateAuthor(_, args) {
            db.authors = db.authors.map((au) => {
                if(args.id == au.id) {
                    return { ...au, ...args.edit }
                }
                return au
            })

            return db.authors.find(au => au.id == args.id )
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})


const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})


console.log(`🚀  Server ready at: ${url}`);