import MongoDb from 'mongodb'
import { getUsers } from '../db/database.js'

// ObjectID (번호 관리하는 객체를 만들 수 있음)
const ObjectID = MongoDb.ObjectId


// 
export async function findByUsername(username) {
    return getUsers().find({ username }).next().then(mapOptionalUser) //username 이 찾아지면 연결시키는 함수 -> .next()
}

// id 로 찾기
export async function findById(id) {
    return getUsers().find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser)
}

// user 생성
export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => result.insertedId.toString)  // result.ops[0]._id = result.insertedId.toString (이제 이거씀)
}


function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user
}