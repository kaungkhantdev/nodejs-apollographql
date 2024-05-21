const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!,
        author: Author!,
        reviews: [Review!]!
    }

    type Author {
        id: ID!,
        name: String!
    }

    type Review {
        id: ID!,
        rating: String!,
        content: String!,
        author: Author!
    }

    type Query {
        games: [Game],
        authors: [Author],
        reviews: [Review],
        review(id: ID!): Review
    }
`;

export default typeDefs