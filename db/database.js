import { config } from '../config.js'
import SQ from 'sequelize'

const { host, user, database, password } = config.db
export const sequelize = new SQ.Sequelize(database, user, password, {   // 초록색 = class 표시
    host,
    dialect: 'mysql',
    logging: false
})

// const pool = mysql.createPool({   // 이제 안씀
//     host: config.db.host,
//     user: config.db.user,
//     database: config.db.database,
//     password: config.db.password
// })

// export const db = pool.promise()