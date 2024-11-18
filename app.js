import express from 'express'  // 서버는 익스프레스
import tweetsRouter from './router/tweets.js'  // 트윗라우터 불러오기
import authRouter from './router/auth.js'  // 오쓰라우터 불러오기
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { db } from './db/database.js'

//npm i cors
import cors from 'cors'

const app = express()  // 객체 만들기


app.use(cors({
    origin: '*',
    credentials: true // 쿠키 허용하는 것
}))


app.use(express.json())  // 미들웨어 만들기, 통신은 익스프레스 제이슨으로만

app.use('/tweets', tweetsRouter)  // 트윗라우터 불러오기
app.use('/auth', authRouter)



app.use((req, res, next) => {   // 다 실패하면 여기로 넘어옴
    res.sendStatus(404)
}) 

// app.listen(8080)  // 8080 으로 바꿈 -> 리액트 등 다른 프로그램 포트랑 겹칠 수 있어서 바꿈
// app.listen(config.host.port) // 왜 바꾸는지 이해못함

// db.getConnection().then((conneciton) => console.log(conneciton))  // 연결상태를 콘솔로 찍었기 때문에 주석 처리하고 진행
const server = app.listen(config.host.port)
initSocket(server)