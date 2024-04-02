const { ApolloServer } = require('apollo-server');
//const { secretKey } = require('./config'); // Replace with your own secret key 
const { Articles } = require('./Resolvers/articles');
const { Category } = require('./Resolvers/Category');
const { Mutation } = require('./Resolvers/Mutation');
const { Query } = require('./Resolvers/Query');
const { User } = require('./Resolvers/User');
const { users, comments, articles, categories } = require('./db')
const { verifyAndDecodeToken } = require('./Tools/verifyAndDecodeToken')

const server = new ApolloServer({
  typeDefs,
  resolvers : {
    Articles,
    Category,
    Mutation,
    Query,
    User
  },
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const articleTitle = req.headers.currentarticle || ''; // Assuming you pass the current article title in the "currentarticle" header
  
    try {
      const decodedToken = verifyAndDecodeToken(token, secretKey);
      const currentUser = users.find(user => user.id === decodedToken.userId);
  
      // Fetch the current article based on the article title
      const currentArticle = articles.find(article => article.title === articleTitle);
  
      // Add test users and articles to the context object
      const context = {
        currentUser,
        currentArticle,
        db: {
          users, comments, articles, categories
        },
      };
  
      return context;
    } catch (error) {
      // Handle token errors (same as before)
      return { currentUser: null, currentArticle: null };
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

