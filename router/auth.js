// 회원 관리 (사용자 쪽)

import express from 'express'
import * as authController from '../controller/auth.js'
import {body} from 'express-validator'
import {validate} from '../middleware/validator.js'
import { isAuth } from '../middleware/auth.js'

const router = express.Router() // 라우터 기능할 것


// 서버에서 유효성 검사
const validateLogin = [
    body('username').trim().isLength({min:4}).withMessage('최소 4자 이상 입력').matches(/^[a-zA-Z0-9]*$/).withMessage('특수 문자 사용불가'),
    // matches() 특수문자 못 넣게
    body('password').trim().isLength({min:8}).withMessage('최소 8자 이상 입력'), 
    validate
] 

const validateSignup = [
    ...validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력'),
    body('email').trim().isEmail().withMessage('이메일 형식 확인'),
    validate
]


// 1. 회원가입
router.post('/signup', validateLogin, authController.signup)


// 2. 로그인
router.post('/login', validateLogin, authController.login)


// http(웹)특징: 사용자가 서버에 요청(req)하고 응답(res)이 오면 브라우저에 보임 - 한번 요청하고 응답오면 통신이 끊김, 또 요청하면 응답받고 끊김 - 반복
// 3. 로그인 유지
router.get('/me', isAuth, authController.me)  //controller > auth.js로



export default router

