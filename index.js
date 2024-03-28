const { v4: uuidv4 } = require('uuid');
const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
//const { secretKey } = require('./config'); // Replace with your own secret key
const secretKey = 'Dani1994'

let users = [
  // Replace with your initial user data
  {
    id: 'uuid1', // Use UUIDs for unique identifiers
    username: "danoxi",
    email: "dani@gmail.com",
    password: "password",
  },
];

let articles = [];

function verifyAndDecodeToken(token, secretKey) {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    // Handle token verification errors (same as before)
  }
}

const typeDefs = gql`

  type User {
    id: ID!
    username: String!
    email: String!
    # ... other user fields
  }

  type Query {
    users: [User!]!
  }

  # Article Schema Types
  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    # ... other article fields
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
    resetPassword(newPassword: String!): User!
    createArticle(title: String!, content: String!): Article!
    # Edit and delete article mutations (implement later)
  }

  type LoginResponse {
    message: String!
    token: String!
    user: User!
  }

`;

const resolvers = {
  Query: {
    users: () => users, // Return all users from the array
  },
  Mutation: {
    registerUser: (parent, { username, email, password }) => {
      const isEmailUnique = users.every(user => user.email !== email);

      if (isEmailUnique) {
        const newUser = {
          id: uuidv4(),
          username,
          email,
          password,
        };
        users.push(newUser);
        return newUser;
      } else {
        throw new Error('Email already exists');
      }
    },
    login: (parent, { username, password }, context) => {
      const user = users.find(user => user.username === username);
      if (!user || password !== user.password) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      context.currentUser = user;
      return {
        message: 'Login successful',
        token,
        user,
      };
    },
    resetPassword: (parent, { newPassword }, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to reset password');
      }

      const user = context.currentUser;
      user.password = newPassword;
      // Update user data in the array (implement logic to update the specific user)
      return user;
    },
    createArticle: (parent, { title, content }, context) => {
      try {
        // Check if user is logged in (assuming context.currentUser exists)
        // if (!context.currentUser) {
        //   throw new Error('User must be logged in to create articles');
        // }
    
        // Check if request object exists in context (optional, for safety)
        // if (!context.req) {
        //   throw new Error('Request object not available in context');
        // }
    
        // Retrieve authorization token from headers
        const authorizationHeader = context.req.headers.authorization;
    
        // Check if authorization header is present
        if (!authorizationHeader) {
          throw new Error('Authorization header is required');
        }
    
        // Extract token (assuming Bearer token format)
        const token = authorizationHeader.split(' ')[1]; // Assuming format: "Bearer <token>"
    
        // Validate the token using the verifyAndDecodeToken function
        const decodedToken = verifyAndDecodeToken(token, secretKey);
    
        // Additional checks based on decodedToken content (optional)
        // You can perform checks like user ID matching context.currentUser.id
    
        // If token verification passes, proceed with article creation
        const newArticle = {
          id: uuidv4(),
          title,
          content,
          author: context.currentUser, // Assuming you have the current user information in the context
          createdAt: new Date().toISOString(),
        };
    
        articles.push(newArticle);
        return newArticle;
      } catch (error) {
        throw new Error(error.message || 'An error occurred while creating the article'); // Provide a more generic error for non-specific issues
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    try {
      const decodedToken = verifyAndDecodeToken(token, secretKey);
      const currentUser = users.find(user => user.id === decodedToken.userId);
      return { currentUser };
    } catch (error) {
      // Handle token errors (same as before)
      return { currentUser: null };
    }
  },
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }})

const port = 7000; // Specify the desired port number

const url = 'http://localhost'
  // Start the server on the specified port
  server.listen(port).then(({ url }) => {
    console.log(`Server started at ${url}`);
  }).catch(error => {
    console.error('Error starting server:', error);
  });

console.log(`Server ready at: ${url}`)

