// Posts microservice
const { GraphQLDateTime } = "graphql-iso-date";

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const { getAllPosts, getPostByID, getAllUsers, getUserByID } = require('./actions')

const port = 4002;

const typeDefs = gql`
  scalar Date
  type Post{
    id: ID!
    title: String
    body: String
    date: Date!
    authorId: ID!
    author: User 
   
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
          return posts.filter((post) => post.authorId === parseInt(user.id))
      }
  },
  Post: {
    async author({authorId}){
      const users = await getAllUsers()
      return users.find((user) => user.id === parseInt({authorId}.authorId))
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