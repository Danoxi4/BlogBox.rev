const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

exports.Mutation = {
    registerUser: (parent, { username, email, password } ) => {
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
    editArticle: (parent, { newTitle, newContent }, context) => {
      try {
        // Check if user is logged in (assuming context.currentUser exists)
        if (!context.currentUser) {
          throw new Error('User must be logged in to edit articles');
        }
    
        const currentArticle = context.currentArticle;
    
        // Check if the current article exists
        if (!currentArticle) {
          throw new Error('Article not found');
        }
    
        // Update article properties
        currentArticle.title = newTitle || currentArticle.title; // Update title if newTitle provided, otherwise keep existing title
        currentArticle.content = newContent;
        currentArticle.updatedAt = new Date().toISOString();
    
        return currentArticle; // Return the updated article
      } catch (error) {
        throw new Error(error.message); // Rethrow the error with the original message
      }
    },
    deleteArticle: (parent, args, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to delete articles');
      }
    
      const currentArticle = context.currentArticle;
    
      // Check if the current article exists
      if (!currentArticle) {
        throw new Error('Article not found');
      }
    
      // **Authorization check:**
      // - If you have a role-based authorization system, check if the logged-in user has the necessary permission (e.g., "admin" or "author" of the article) to delete articles.
      // - Replace the following with your specific authorization logic.
      if (currentArticle.author.id !== context.currentUser.id) {
        throw new Error('Unauthorized deletion: You can only delete your own articles or articles with admin privileges.');
      }
    
      const articleIndex = articles.findIndex(article => article.title === currentArticle.title);
    
      articles.splice(articleIndex, 1); // Remove article from the array
    
      return true;
    },
    commentOnArticle: (parent, { content }, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to comment on articles');
      }
    
      const currentArticle = context.currentArticle;
    
      // Check if the current article exists
      if (!currentArticle) {
        throw new Error('Article not found');
      }
    
      const newComment = {
        id: uuidv4(), // Generate a unique ID for the comment
        content,
        author: context.currentUser, // Add the currently logged-in user as the comment author
        createdAt: new Date().toISOString(),
      };
    
      currentArticle.comments = currentArticle.comments || []; // Initialize comments array if not present
      currentArticle.comments.push(newComment);
    
      return currentArticle; // Return the updated article object with the new comment
    },
    likeArticle: (parent, args, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to like articles');
      }
    
      const currentArticle = context.currentArticle;
    
      // Check if the current article exists
      if (!currentArticle) {
        throw new Error('Article not found');
      }
    
      const userLiked = currentArticle.likes?.some(userId => userId === context.currentUser.id);
    
      if (userLiked) {
        throw new Error('You already liked this article');
      }
    
      currentArticle.likes = currentArticle.likes || []; // Initialize likes array if not present
      currentArticle.likes.push(context.currentUser.id);
    
      return currentArticle; // Return the updated article object with the new like
    },
    dislikeArticle: (parent, args, context) => {
      if (!context.currentUser) {
        throw new Error('User must be logged in to dislike articles');
      }
    
      const currentArticle = context.currentArticle;
    
      // Check if the current article exists
      if (!currentArticle) {
        throw new Error('Article not found');
      }
    
      const userDisliked = currentArticle.dislikes?.some(userId => userId === context.currentUser.id);
    
      if (userDisliked) {
        throw new Error('You already disliked this article');
      }
    
      currentArticle.dislikes = currentArticle.dislikes || []; // Initialize dislikes array if not present
      currentArticle.dislikes.push(context.currentUser.id);
    
      return currentArticle; // Return the updated article object with the new dislike
    },    
  }