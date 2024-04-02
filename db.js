const users = [
  {
    id: '1',
    username: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user1@example.com',
    password: 'password1',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '2',
    username: 'user2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'user2@example.com',
    password: 'password2',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '3',
    username: 'user3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'user3@example.com',
    password: 'password3',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '4',
    username: 'user4',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'user4@example.com',
    password: 'password4',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '5',
    username: 'user5',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'user5@example.com',
    password: 'password5',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '6',
    username: 'user6',
    firstName: 'Emily',
    lastName: 'Wilson',
    email: 'user6@example.com',
    password: 'password6',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '7',
    username: 'user7',
    firstName: 'David',
    lastName: 'Lee',
    email: 'user7@example.com',
    password: 'password7',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '8',
    username: 'user8',
    firstName: 'Olivia',
    lastName: 'Taylor',
    email: 'user8@example.com',
    password: 'password8',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
  {
    id: '9',
    username: 'user9',
    firstName: 'Daniel',
    lastName: 'Clark',
    email: 'user9@example.com',
    password: 'password9',
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    followers: [],
    following: [],
    articles: [],
    comments: [],
  },
];

const comments = [
  {
    id: '1',
    content: 'Great article!',
    author: users[0],
    article: null, // This will be populated later
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '2',
    content: 'Well written!',
    author: users[1],
    article: null, // This will be populated later
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '3',
    content: 'Interesting insights.',
    author: users[2],
    article: null, // This will be populated later
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '4',
    content: 'I completely agree!',
    author: users[3],
    article: null,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '5',
    content: 'Great job!',
    author: users[4],
    article: null,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '6',
    content: 'I found this very helpful!',
    author: users[5],
    article: null,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '7',
    content: 'Thanks for sharing!',
    author: users[6],
    article: null,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '8',
    content: 'I have a question.',
    author: users[7],
    article: null,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '9',
    content: 'Keep up the good work!',
    author: users[8],
    article: null,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },
];

const articles = [
  {
    id: '1',
    title: 'Article 1',
    content: 'This is article 1.',
    author: users[0],
    comments: [], // This will be populated later
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null, // This will be populated later
  },
  {
    id: '2',
    title: 'Article 2',
    content: 'This is article 2.',
    author: users[1],
    comments: [], // This will be populated later
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null, // This will be populated later
  },
  {
    id: '3',
    title: 'Article 3',
    content: 'This is article 3.',
    author: users[2],
    comments: [], // This will be populated later
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null, // This will be populated later
  },
  {
    id: '4',
    title: 'Article 4',
    content: 'This is article 4.',
    author: users[3],
    comments: [],
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null,
  },
  {
    id: '5',
    title: 'Article 5',
    content: 'This is article 5.',
    author: users[4],
    comments: [],
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null,
  },
  {
    id: '6',
    title: 'Article 6',
    content: 'This is article 6.',
    author: users[5],
    comments: [],
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null,
  },
  {
    id: '7',
    title: 'Article 7',
    content: 'This is article 7.',
    author: users[6],
    comments: [],
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null,
  },
  {
    id: '8',
    title: 'Article 8',
    content: 'This is article 8.',
    author: users[7],
    comments: [],
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null,
  },
  {
    id: '9',
    title: 'Article 9',
    content: 'This is article 9.',
    author: users[8],
    comments: [],
    likes: 0,
    dislikes: 0,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    category: null,
  }
];

const categories = [
  {
    id: '1',
    name: 'Category 1',
    description: 'This is category 1.',
    articles: [], // This will be populated later
  },
  {
    id: '2',
    name: 'Category 2',
    description: 'This is category 2.',
    articles: [], // This will be populated later
  },
  {
    id: '3',
    name: 'Category 3',
    description: 'This is category 3.',
    articles: [], // This will be populated later
  },
  {
    id: '4',
    name: 'Category 4',
    description: 'This is category 4.',
    articles: [],
  },
  {
    id: '5',
    name: 'Category 5',
    description: 'This is category 5.',
    articles: [],
  },
  {
    id: '6',
    name: 'Category 6',
    description: 'This is category 6.',
    articles: [],
  },
  {
    id: '7',
    name: 'Category 7',
    description: 'This is category 7.',
    articles: [],
  },
  {
    id: '8',
    name: 'Category 8',
    description: 'This is category 8.',
    articles: [],
  },
  {
    id: '9',
    name: 'Category 9',
    description: 'This is category 9.',
    articles: [],
  }
];



// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// module.exports = sequelize;