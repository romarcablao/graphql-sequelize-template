module.exports = {
    Query: {
        test: (_, {inputParam}) => {
            console.log(inputParam.param);
            return {
                name: inputParam.param,
                value: 99
            }
        }
    }
}