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