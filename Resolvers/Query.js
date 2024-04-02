exports.Query =  {
    users: () => users, // Return all users from the array
    viewArticle: (_, { id }) => {
      const article = articles.find(article => article.id === id);
      context.currentArticle = article
      return article;
    },
    searchArticlesByCategory: (parent, { category }) => {
      return articles.filter(article => article.category === category);
    },
    searchArticlesByAuthorName: (parent, { authorName }) => {
      return articles.filter(article => article.author.name.toLowerCase().includes(authorName.toLowerCase()));
    },
    searchArticlesByTitle: (parent, { title }) => {
      return articles.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
    },
    searchAuthorByName: (parent, { authorName }) => {
      return authors.filter(author => author.name.toLowerCase().includes(authorName.toLowerCase()));
    }
  }