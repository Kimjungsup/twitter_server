import { config } from '../config.js'
import MongoDb from 'mongodb'


let db
// 몽고db 클라우드로 연결
export async function connectDB() {
    return MongoDb.MongoClient.connect(config.db.host).then((client) => {
        db = client.db()
    })
}  //export 했으니깐 app.js에서 사용 가능 ㄱㄱ


// 디비에서 컬렉션 가져오기
export function getUsers() {
    return db.collection('users')
}

export function getTweets() {
    return db.collection('tweets')
}






// 시퀄라이즈라서 삭제
// import SQ from 'sequelize'

// const { host, user, database, password } = config.db
// export const sequelize = new SQ.Sequelize(database, user, password, {   // 초록색 = class 표시
//     host,
//     dialect: 'mysql',
//     logging: false
// })  여기까지 삭제

// const pool = mysql.createPool({   // 이제 안씀
//     host: config.db.host,
//     user: config.db.user,
//     database: config.db.database,
//     password: config.db.password
// })

// export const db = pool.promise()