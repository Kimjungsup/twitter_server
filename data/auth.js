import SQ from 'sequelize'
import { sequelize } from '../db/database.js'
// import { db } from '../db/database.js' // 필요없어짐

//테이블도 여기서 객체로 만들어서 함
const DataTypes = SQ.DataTypes

//테이블 생성 .define('테이블 이름, {테이블 구성})
export const User = sequelize.define(
    'user', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.TEXT
    },
    { timestamps: false }  //creatAt 자동으로 안쓰게 만들어주는 것
)

export async function findByUsername(username) {
    return User.findOne({where: { username }})
}

export async function findById(id) {
    return User.findByPk(id)    
}

export async function createUser(user) {
        return User.create(user).then((data) => data.dataValues.id)
}

// sequelize 하면서 다 필요없어짐
// export async function createUser(user) {   // user로 묶음???
//     const { username, password, name, email, url } = user
//     return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)',
//         [username, password, name, email, url]) .then((result) => result[0].insertId)
// }

// export async function findByUsername(username) {
//     return db.execute('SELECT * FROM users WHERE username=?', [username])
//         .then((result) => result[0][0])
// }

// export async function findById(id) {
//     return db.execute('SELECT * FROM users WHERE id=?', [id])
//         .then((result) => result[0][0])
// }
