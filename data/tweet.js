import Mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js'
import * as UserRepository from './auth.js' 

// 스키마 만들기
const tweetSchema = new Mongoose.Schema({
    text: { type: String, require: true },
    userId: { type: String, require: true },
    name: { type: String, require: true },
    username: { type: String, require: true },
    url: String
}, { timestamps: true})

useVirtualId(tweetSchema)
const Tweet = Mongoose.model('Tweet', tweetSchema)


// 글 불러오기 (기존 껄로 변경)
export async function getAll() {
    return Tweet.find().sort({ createdAt: -1 })
}

// 유저 이름에 따른 트윗 불러오기
export async function getAllByUsername(username) {
    return Tweet.find({ username }).sort({ createdAt: -1 })
}

// 글번호(아이디)에 트윗 불러오기  // _id: 673becf9b26079df940a5019 값을 복사해서 넣어야 나옴
export async function getById(id) {
    return Tweet.findById(id)
}


// 등록
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => new Tweet({
            text,
            userId,
            name: user.name,
            username: user.username
        }).save())
}


// 업데이트
export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, { text }, { returnDocument: 'after'})
}

// 삭제
export async function remove(id) {
    return Tweet.findByIdAndDelete(id)
}