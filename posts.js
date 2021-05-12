// Posts microservice
const { GraphQLDateTime } = "graphql-iso-date";

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const { getAllPosts, getPostByID } = require('./actions')

const port = 4002;

const typeDefs = gql`
  scalar Date

  type Post @key(fields: "id"){
    id: ID!
    title: String
    body: String
    date: Date!
    authorId: ID
  }

  extend type Query {
    fetchPost(id: ID!): Post
    fetchAllPosts: [Post]
  }
`;

const resolvers = {
  Date: GraphQLDateTime,
  Post: {
    __resolveReference(ref){
      return getPostByID(ref.id)
    }
  },
//   User: {
//       async fetchAllPosts(User){
//           const posts = await getAllPosts()
//           return posts.filter(({authorId}) => authorId === parseInt(User.id))
//       }
//   },
//   Post: {
//     getPostByID(id)
//   },
  Query: {
    fetchPost(_, { id }) {
      return getPostByID(id)
    },
    fetchAllPosts() {
      return getAllPosts()
    }
  }
};


const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});


server.listen({ port }).then(({ url }) => {
    console.log(`Posts service ready at ${url}`);
});