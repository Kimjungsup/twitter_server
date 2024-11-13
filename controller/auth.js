import * as authRepository from '../data/auth.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// 시크릿 키 + 상수 + 만료일
const secretkey = 'abcdefg1234%^&*' // 코드에 관리하면 안됨
const bcryptSaltRounds = 10
const jwtExpiresIndays = '2d'

// 토큰 만들어내는 함수
async function createJwtToken(id) {
    return jwt.sign(
        {id}, secretkey, {expiresIn: jwtExpiresIndays})
}

// signup
export async function signup(req, res, next) {
    const { username, password, name, email } = req.body
    // 회원 있는 지 중복체크
    const found = await authRepository.findByUsername(username) 
    if(found){
        return res.status(409).json({message: `${username}이 이미 있습니다`})
    }

    // const users = await authRepository.createUser(username, password, name, email)
    const hashed = bcrypt.hashSync(password, bcryptSaltRounds)  // bcryptSaltRounds 보안상 따로 뺌 10값
    const users = await authRepository.createUser(username, hashed, name, email)
    //토큰 발행
    const token = await createJwtToken(users.id)
    res.status(201).json({token,users})   
}


// login   안됨
export async function login(req, res, next) {
    const { username, password } = req.body
    const user = await authRepository.findByUsername(username)
    if(!user){
        return res.status(401).json(`${username} 아이디를 찾을 수 없음`)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(401).json({message: `아이디 또는 비밀번호 확인`})
    }

    const token = await createJwtToken(user.id)
    res.status(200).json({ token, username })
}



// 비번 암호화
export async function verify(req, res, next) {
    const token = req.headers['Token']  // 사용자가 서버에 req 하는 헤더에 '토큰'이 있냐
    if(token){
        res.status(200).json(token)
    }
}


// me 함수
export async function me(req, res, next) {
    const user = await authRepository.findById(req.userId)
    console.log(user)
    if(!user){
        return res.status(404).json({message: '일치하는 사용자가 없음'})
    }    
    res.status(200).json({token: req.token, username: user.username})
}
