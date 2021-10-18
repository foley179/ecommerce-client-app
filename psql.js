const {Client} = require("pg")

async function psqlQuery(query, params=[]) {
/*
    // testing (constant issues when attempting to check node_env to configure this, stuck with commenting it out for now)
    require('dotenv').config()
    const psql = new Client({
        connectionString: `postgres://${process.env.REACT_APP_PSQL_USER}:${process.env.REACT_APP_PSQL_PASSWORD}@localhost:5432/pern_ecommerce_app`,
    })
*/
    // production
    const psql = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    psql.connect()
    
    let output
    if (params.length === 0) {
        output = await psql.query(query)        
    } else {
        output = await psql.query(query, params)
    }
    
    psql.end()
    return output
}

module.exports = psqlQuery