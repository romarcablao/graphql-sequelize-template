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