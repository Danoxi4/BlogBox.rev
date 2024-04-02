exports.Category= {
    articles: (parent) => {
      const categoryArticles = articles.filter(article => article.category === parent.name);
      return categoryArticles;
    }
  }