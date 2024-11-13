import * as authRepository from '../data/auth.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = 'abcdefg1234%^&*' // 코드에 관리하면 안됨

// 토큰 만들어내는 함수
async function makeToken(id) {
    const token = jwt.sign({
        id: id,
        isAdmin: false
    }, secret, {expiresIn: '1h'})
    return token
}

// signup
export async function signup(req, res, next) {
    const { username, password, name, email } = req.body
    // const users = await authRepository.createUser(username, password, name, email)
    const hashed = bcrypt.hashSync(password, 10)
    const users = await authRepository.createUser(username, hashed, name, email)
    if(users){
        res.status(201).json(users)
    }   
}


// login
export async function login(req, res, next) {
    const { username, password } = req.body
    const user = await authRepository.findByUsername(username)  // 바꾼 함수 이름으로 바꿔주기
    
    if(!user){  // 없다면
        res.status(201).json(`${username} 아이디를 찾을 수 없음`)
    } else {
        if(bcrypt.compareSync(password, user.password)) {
            res.status(201).header('Token', makeToken(username)).json(`${username} 로그인 완료`)
        }else{
            res.status(404).json({message: `${username}님이 아이디 또는 비밀번호 확인`})
        }
    }
}


// 비번 암호화
export async function verify(req, res, next) {
    const token = req.header['Token']  // 사용자가 서버에 req 하는 헤더에 '토큰'이 있냐
    if(token){
        res.status(200).json(token)
    }
}



