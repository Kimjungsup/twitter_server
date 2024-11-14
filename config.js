import dotenv from 'dotenv'

dotenv.config()    // 원래 env 못 읽는데 이거 실행하면서 env를 읽게 해줌, (키/밸류 배열로 읽음)

function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue   // 참이면 앞의 값, 거짓이면 뒤의 값    
    if(value == null){
        throw new Error(`키 ${key}는 undefined!!`)
    }
    return value
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),  // .env 초가 여기로 들어옴
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 259200))
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    }
}