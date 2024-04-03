const Sequelize = require("sequelize")
const sequelize = new Sequelize("vendas_db", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}