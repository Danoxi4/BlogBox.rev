
exports.Article = {
    category: (parent) => {
      const category = categories.find(category => category.name === parent.category);
      return category;
    },
    author: (parent) => {
      const author = authors.find(author => author.id === parent.authorId);
      return author;
    },
    comments: (parent) => {
      const articleComments = comments.filter(comment => comment.articleId === parent.id);
      return articleComments;
    }
  }