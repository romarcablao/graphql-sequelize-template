const Sequelize = require('sequelize');
const sequelize = require('./config/sequelize.config');
const user = require('./model/user.def.db');

const DB = {
    createUser: async (data) => {

        let tableIsAvailable = await user.sync()
            .then(() => { return true })
            .catch(() => { return false });

        if (!tableIsAvailable) {
            return JSON.stringify({ err: "Error!" });
        }

        return await user.create({
            name: data.name,
            email: data.email
        }).then((data) => {
            return data.dataValues
        })
    },
    updateUser: async (data) => {
        await user.update({ name: data.name, email: data.email }, { where: { id: data.id } })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }
}

module.exports = DB;