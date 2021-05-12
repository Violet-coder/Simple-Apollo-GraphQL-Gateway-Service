// User microservice
const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const { getAllUsers, getUserByID } = require('./actions')

const port = 4001;

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String
}

  extend type Query {
    fetchUser(id: ID!): User
    fetchAllUsers: [User]
  }
`;

const resolvers = {
  User: {
    __resolveReference(ref){
      return getUserByID(ref.id)
    }
  },

  Query: {
    fetchUser(_, { id }) {
      return getUserByID({id})
    },    
    fetchAllUsers() {
      return getAllUsers()
    }
  }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
    console.log(`Users service ready at ${url}`);
});