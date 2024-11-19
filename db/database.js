import { config } from '../config.js'
import Mongoose from 'mongoose'


let db
// 몽구스 클라우드로 연결
export async function connectDB() {
    return Mongoose.connect(config.db.host)
}  

export function useVirtualId(schema) {
    schema.virtual('id').get(function () {
        return this._id.toString()
    })
    schema.set('toJSON', { virtual: true})       // json 이랑 객체 왔다갔다 편하게
    schema.set('toObject', { virtual: true})
}


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