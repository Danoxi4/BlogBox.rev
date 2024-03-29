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
    id: ID
    username: String!
    firstName: String!
    lastName: String!
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
    registerUser(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
    resetPassword(newPassword: String!): User!
    createArticle(title: String!, content: String!): Article!
    editArticle(title: String!, newTitle: String, newContent: String): Article!
    deleteArticle(title: String!): Boolean! # Delete an article by its ID
    editProfile(username: String, firstName: String, lastName:String, password: String): User! # Edit a user profile
    deleteProfile(username: String! ): Boolean! # Delete a user profile
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
    editArticle: (parent, { title, newTitle, newContent }, context) => {
      try {
        // Check if user is logged in (assuming context.currentUser exists)
        if (!context.currentUser) {
          throw new Error('User must be logged in to edit articles');
        }
    
        // Find the article index by title
        const articleIndex = articles.findIndex(article => article.title === title);
    
        // Check if article exists
        if (articleIndex === -1) {
          throw new Error('Article not found');
        }
    
        // Update article properties
        articles[articleIndex].title = newTitle || title; // Update title if newTitle provided, otherwise keep existing title
        articles[articleIndex].content = newContent;
      //  articles[articleIndex].category = category;
        articles[articleIndex].updatedAt = new Date().toISOString();
    
        return articles[articleIndex]; // Return the updated article
      } catch (error) {
        throw new Error(error.message); // Rethrow the error with the original message
      }
    },
    deleteArticle: (parent, { title }, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to delete articles');
      }
    
      const articleIndex = articles.findIndex(article => article.title === title);
    
      if (articleIndex === -1) {
        throw new Error('Article not found');
      }
    
      // **Authorization check:**
      // - If you have a role-based authorization system, check if the logged-in user has the necessary permission (e.g., "admin" or "author" of the article) to delete articles.
      // - Replace the following with your specific authorization logic.
      if (articles[articleIndex].author.id !== context.currentUser.id) {
        throw new Error('Unauthorized deletion: You can only delete your own articles or articles with admin privileges.');
      }
    
      articles.splice(articleIndex, 1); // Remove article from the array
    
      return true;
    },
    editProfile: (parent, {  username, firstName, lastName, password }, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to edit profile');
      }
    
      const userIndex = users.findIndex(user => user.username === username);
    
      if (userIndex === -1) {
        throw new Error('User not found');
      }
    
      // **Validation and sanitization:**
      // - Implement validation rules for username, firstName, and lastName (e.g., minimum length, allowed characters).
      // - Sanitize user input to prevent potential security vulnerabilities (e.g., XSS attacks).
      // - Replace the following with your specific validation and sanitization logic.
      if (username && username.length < 3) {
        throw new Error('Username must be at least 3 characters long.');
      }
    
      if (firstName && firstName.length < 3) {
        throw new Error('First name must be at least 3 characters long.');
      }
    
      if (lastName && lastName.length < 3) {
        throw new Error('Last name must be at least 3 characters long.');
      }
    
      // Sanitize user input (example using a hypothetical `sanitizeInput` function)
      const sanitizedUsername = sanitizeInput(username);
      const sanitizedFirstName = sanitizeInput(firstName);
      const sanitizedLastName = sanitizeInput(lastName);
    
      const updatedUser = {
        ...users[userIndex], // Copy existing user data
        username: sanitizedUsername || users[userIndex].username, // Update username if provided
        firstName: sanitizedFirstName || users[userIndex].firstName, // Update firstName if provided
        lastName: sanitizedLastName || users[userIndex].lastName, // Update lastName if provided,
      };
    
      // **Password update logic:**
      if (password) {
        // Validate password strength (consider using a password hashing library)
        // Replace the following with your password hashing logic
        const hashedPassword = hashPassword(password); // Hypothetical password hashing function
        updatedUser.password = hashedPassword;
      }
    
      users[userIndex] = updatedUser; // Update user data in the array
    
      return updatedUser;
    },
    deleteProfile: (parent, { username }, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to delete profile');
      }
    
      const userIndex = users.findIndex(user => user.username === username);
    
      if (userIndex === -1) {
        throw new Error('User not found');
      }
    
      // **Cascading deletes:**
      // - If users have associated data (e.g., articles, comments), implement logic to handle their deletion as well.
      // - Consider using transactions or appropriate data integrity checks to ensure consistent database updates.
      // - Replace the following with your specific logic for handling cascading deletes.
      const articlesToDelete = articles.filter(article => article.author.id === id);
      articlesToDelete.forEach(article => {
        const articleIndex = articles.findIndex(a => a.id === article.id);
        if (articleIndex !== -1) {
          articles.splice(articleIndex, 1);
        }
      });
    
      // **Additional checks:**
      // - Consider preventing users from deleting their own profiles if they have outstanding tasks or associated data that needs to be migrated.
      // - Replace the following with your specific logic for additional checks.
      if (id === context.currentUser.id) {
        throw new Error('You cannot delete your own profile at this time. Please contact support for assistance.');
      }
    
      users.splice(userIndex, 1); // Remove user from the array
    
      // Destroy the user's session (optional)
      context.req.session.destroy();
    
      return true;
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

const port = 8555; // Specify the desired port number

const url = 'http://localhost'
  // Start the server on the specified port
  server.listen(port).then(({ url }) => {
    console.log(`Server started at ${url}`);
  }).catch(error => {
    console.error('Error starting server:', error);
  });

console.log(`Server ready at: ${url}`)

