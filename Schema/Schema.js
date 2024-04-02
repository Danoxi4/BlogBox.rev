
const { gql } = require('apollo-server');

exports.typeDefs = gql`

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
    comments: [Comment]
  } 

  type Query {
      users: User
      viewArticle(title: String!): Article
  }

  # Article Schema Types
  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment]
    likes: Int
    dislikes: Int
    createdAt: String!
    updatedAt: String!
    category: Category
    
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

  type Comment {
    id: ID!
    content: String!
    author: User!
    article: Article!
    createdAt: String!
    updatedAt: String!
    }

  


  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
    resetPassword(newPassword: String!): User!
    createArticle(title: String!, content: String!): Article!
    editArticle(newTitle: String, newContent: String): Article
    deleteArticle: Boolean
    commentOnArticle(content: String!): Article
    likeArticle: Article
    dislikeArticle: Article
    editProfile(username: String, firstName: String, lastName: String, password: String) : User! 
    deleteProfile: Boolean
    # Edit and delete article mutations (implement later)
  }

  type LoginResponse {
    message: String!
    token: String!
    user: User!
  } 

`;