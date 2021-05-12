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
    authorId: User
  }

  extend type User @key(fields: "id"){
    id: ID! @external
    posts: [Post]
  }

  extend type Query {
    fetchPost(id: ID!): Post
    fetchAllPosts: [Post]
  }
`;

const resolvers = {
  Date: GraphQLDateTime,
  User: {
      async posts(user){
          const posts = await getAllPosts()
          return posts.filter(({authorId}) => authorId === parseInt(user.id))
      }
  },
  Post: {
    authorId(post){
      return post.authorId.map(id => ({__typename: "User", id }))
    }
  },

  Query: {
    fetchPost(_, { id }) {
      return getPostByID({id})
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