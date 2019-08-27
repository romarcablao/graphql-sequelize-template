# graphql-sequelize-template
Sample structure/template on using GraphQL and Sequelize

### 1. Defining a database table
```js
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.config');

const User = sequelize.define('tbl_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;
```

### 2. Establishing connection to database
```js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_test_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00'
});

module.exports = sequelize;
```

### 3. GraphQL resolver
```js
const sequelize = require('sequelize');
const user = require('../../database/model/user.def.db');
const DB = require('../../database/sequelize.index');

module.exports = {
    Query: {
        getUsers: async () => {
            return await user.findAll();
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            let res = await DB.createUser(input);
            return res;
        },
        updateUser: async (_, { input }) => {
            let res = await DB.updateUser(input);
            if(!res){ return JSON.stringify({err: "Unable to update user!"})}
            return input
        }
    }
}
```

### 4. GraphQL type definition
```js
module.exports = `
    type User{
        id: ID
        name: String
        email: String
        createdAt: String
        updatedAt: String
    }

    type Query{
        getUsers: [User]!
    }

    input UserCreateInput{
        name: String!
        email: String!
    }

    input UserUpdateInput{
        id: ID!
        name: String
        email: String
    }

    type Mutation{
        createUser(input: UserCreateInput): User!
        updateUser(input: UserUpdateInput): User!
    }
`
```

### 4. Setting GraphQL server
```js
const { GraphQLServer } = require('graphql-yoga');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDef');

const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/',
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, ({ port }) => console.log(`Server is running on localhost:${port}`))
```
