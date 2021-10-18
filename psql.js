const {Client} = require("pg")

async function psqlQuery(query, params=[]) {
    let psql
    if (process.env.NODE_ENV === "production") {
        psql = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorised: false
            }
        })
    } else {
        psql = new Client({
            connectionString: `postgres://${process.env.REACT_APP_PSQL_USER}:${process.env.REACT_APP_PSQL_PASSWORD}@localhost:5432/pern_ecommerce_app`,
        })
    }
    
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