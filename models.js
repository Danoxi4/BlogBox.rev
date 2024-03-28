// User model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

// Article model
class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Article',
    timestamps: false,
  }
);

// Category model
class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    timestamps: false,
  }
);

// Tag model
class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
    timestamps: false,
  }
);

// Define associations between models
User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId' });

Category.hasMany(Article, { foreignKey: 'categoryId' });
Article.belongsTo(Category, { foreignKey: 'categoryId' });

Tag.belongsToMany(Article, { through: 'ArticleTag', foreignKey: 'tagId' });
Article.belongsToMany(Tag, { through: 'ArticleTag', foreignKey: 'articleId' });

module.exports = { User, Article, Category, Tag };