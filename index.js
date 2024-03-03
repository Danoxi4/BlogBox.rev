const { ApolloServer, gql } = require('apollo-server');
const { startStandaloneServer } = require('@apollo/server/standalone');

let users = [
    {
    username: "danoxi",
    email: "dani@gmail.com",
    password: "password",
    }
]

const typeDefs = gql`

type User {
  id: ID
  username: String!
  email: String!
  password: String!
  createdAt: String
  updatedAt: String!
  followers: [User]
  following: [User]
  articles : [Article]
} 

type Query {
    users: User
}

# Article Schema Types
type Article { 
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: String!
  updatedAt: String!
  category: Category
  tags: [Tag]!
}

type Category {
  id: ID!
  name: String!
  description: String
  articles: [Article]!
}

type Tag {
  id: ID!
  name: String!
  articles: [Article]!
}


type Mutation {
    registerUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): User
    resetPassword(password: String!) : User
}


`

const resolvers = {
    Query : {
        users: (parent, args, context) => { return users }
    },
    Mutation: {
        registerUser: ( parent, { username, email, password }, context) => {
        
            const isEmailUnique = users.every(user => user.email !== email);
              
            const user = {
                username: username,
                email: email,
                password: password
              };

            if (isEmailUnique) {
                users.push(user);
                console.log('All emails are unique');
                return user
              } else {
                console.log('There are duplicate emails');
              }
        },
        login: (parent, { username, password } , context ) => {
            const user = users.find(user => user.username === username);
            if (!user || user.password !== password) {
                throw new Error('Invalid email or password');
              }
            else{
                console.log('logged in successfully');
                context.user = user;
                return user
            }
        },
        resetPassword : (parent, args, context) => { 
            
        }

    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  
const port = 7000; // Specify the desired port number

const url = 'http://localhost'
  // Start the server on the specified port
  server.listen(port).then(({ url }) => {
    console.log(`Server started at ${url}`);
  }).catch(error => {
    console.error('Error starting server:', error);
  });

console.log(`Server ready at: ${url}`)

