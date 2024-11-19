import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'

// 몽구스 스키마 메서드로 스키마(표) 만들기
const userSchema = new Mongoose.Schema({    
    username: {type: String, require: true },
    name: {type: String, require: true },
    email: {type: String, require: true },
    password: {type: String, require: true },
    url: String
}, { versionKey: false})

useVirtualId(userSchema)
const User = Mongoose.model('User', userSchema)  // 모델 객체 생성,  'User' 단수 객체로 쓰고 알아서 s가 붙음

// 유저 네임으로 찾기 (기존꺼에서 변경 > 굉장히 간단해짐)
export async function findByUsername(username) {
    return User.findOne({ username })
}

// id 로 찾기
export async function findById(id) {     //여기 findByID 는 함수고
    return User.findById(id)             //여기는 User 안에 메서드
}

// user 생성
export async function createUser(user) {
    return new User(user).save().then((data) => data.id)
}


function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user
}