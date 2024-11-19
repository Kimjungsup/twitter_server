import MongoDb, { ReturnDocument } from 'mongodb'
import { getTweets } from '../db/database.js'
import * as UserRepository from './auth.js'  // 몽고db는 join이 없어서 하나의 컬렉션에 다 넣어버릴 예정 그래서 불러옴

// ObjectID (번호 관리하는 객체를 만들 수 있음)
const ObjectID = MongoDb.ObjectId

// 모든 글 불러오기
export async function getAll() {
    return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets)
}


// 등록
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => getTweets().insertOne({
            text,
            createdAt: new Date(),
            userId,
            name: user.name,
            username: user.username,
            url: user.url
        }))    
        .then((result) => {
            const insertedTweetId = result.insertedTweetId
            return getTweets().findOne({ _id: result.insetedId })
        })
        .then(mapOptionalTweet)
}

// 유저 이름에 따른 트윗 불러오기
export async function getAllByUsername(username) {
    return getTweets().find({ username }).sort({ createdAt: -1}).toArray().then(mapTweets)
}

// 글번호(아이디)에 트윗 불러오기  // _id: 673becf9b26079df940a5019 값을 복사해서 넣어야 나옴
export async function getById(id) {
    return getTweets().find({ _id: new ObjectID(id) }).next().then(mapOptionalTweet)
}

// 업데이트
export async function update(id, text) {
    return getTweets().findOneAndUpdate(
        { _id: new ObjectID(id) }, { $set: { text }}, { returnDocument: 'after' }
    ) .then((result) => result).then(mapOptionalTweet)
    
}

// 삭제
export async function remove(id) {
    return getTweets().deleteOne({ _id: new ObjectID(id) })
}


function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet)
}