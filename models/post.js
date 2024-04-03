const db = require("./banco")

const Produtos = db.sequelize.define('produtos', {
    nome:{
        type: db.Sequelize.STRING
    },
    estoque:{
        type: db.Sequelize.INTEGER
    },
    status:{
        type: db.Sequelize.BOOLEAN
    }
})

// Produtos.sync({force:true})

module.exports = Produtos