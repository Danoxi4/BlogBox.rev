exports.User = {
    articles: (parent) => {
      const authorArticles = articles.filter(article => article.author.username === parent.username);
      return authorArticles;
    }
  }