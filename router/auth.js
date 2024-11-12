// 회원 관리 (사용자 쪽)

import express from 'express'
import * as authController from '../controller/auth.js'

const router = express.Router() // 라우터 기능할 것


// 1. 회원가입
router.post('/signup', authController.signup)


// 2. 로그인
router.post('/login', authController.login)


// 3. 로그인 유지




export default router