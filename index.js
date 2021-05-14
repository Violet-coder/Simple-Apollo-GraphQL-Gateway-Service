//Apollo GraphQL Gateway service
const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const port = 4000;

// Initialize an ApolloGateway instance
const gateway = new ApolloGateway({
    serviceList: [
      { name: 'users', url: 'http://localhost:4001' },
      { name: 'posts', url: 'http://localhost:4002' },
    ],
  });

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
    gateway,
    subscriptions: false,
});

server.listen({port}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });