import express from 'express'  // 서버는 익스프레스
import tweetsRouter from './router/tweets.js'  // 트윗라우터 불러오기
import authRouter from './router/auth.js'  // 오쓰라우터 불러오기
import {config} from './config.js'

const app = express()  // 객체 만들기

app.use(express.json())  // 미들웨어 만들기 , 통신은 익스프레스 제이슨으로만

app.use('/tweets', tweetsRouter)  // 트윗라우터 불러오기
app.use('/auth', authRouter)



app.use((req, res, next) => {   // 다 실패하면 여기로 넘어옴
    res.sendStatus(404)
}) 

// app.listen(8080)  // 8080 으로 바꿈 -> 리액트 등 다른 프로그램 포트랑 겹칠 수 있어서 바꿈
app.listen(config.host.port) // 왜 바꾸는지 이해못함
