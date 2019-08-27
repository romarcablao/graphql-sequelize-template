module.exports = `
    type Test{
        name: String!
        value: Int!
    }

    input TestInput{
        param: String!
    }

    type Query{
        test(inputParam: TestInput): Test!
    }
`