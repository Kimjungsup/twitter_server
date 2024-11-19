// 함수 역할 하는 것들은 여기에 다 모아두기
import * as tweetRepository from '../data/tweet.js'
import { getSocketIo } from '../connection/socket.js'


// 모든 트윗을 가져오는 함수
export async function getTweets(req, res, next){
    const username = req.query.username
    const data = await(username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll())
    res.status(200).json(data)
}
 
// 글 번호 하나에 대한 트윗 가져오는 함수
export async function getTweet(req, res, next){
    const id = req.params.id
    const tweet = await tweetRepository.getById(id)
    if(tweet){
        res.status(200).json(tweet)
    } else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}

// 트윗을 생성하는 함수 
export async function createTweet(req, res, next) {
    const { text } = req.body  // 로그인이 되어 토큰이 있는 상황이라 text만 받아오면 됨
    const tweet = await tweetRepository.create(text, req.userId)
    res.status(201).json(tweet)
    getSocketIo().emit('tweets', tweet)
}


// 트윗을 변경하는 함수
export async function updateTweet(req, res, next) {
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepository.getById(id)
    if(!tweet){
        return res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403)
    }

    const updated = await tweetRepository.update(id, text)
    res.status(200).json(updated)    
}

// 트윗을 삭제하는 함수
export async function deleteTweet(req, res, next) {
    const id = req.params.id 
    const tweet = await tweetRepository.getById(id)
    if(!tweet){
        return res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403)
    }    
    await tweetRepository.remove(id)
    res.sendStatus(204)   
}