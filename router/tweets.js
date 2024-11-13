// 트윗하는데 사용

import express from 'express'
import * as tweetController from '../controller/tweet.js'  // router. 안에 함수들을 컨트롤러 안에서 운영 예정

// data 있던 자리
// 여기까지 만들면 app.js 에서 가져 갈 수 있음
// 아래에 작업할 것들 뭐뭐 있을 지 생각

import { body } from 'express-validator'
import { validate } from '../middleware/validator.js'

const router = express.Router() // 라우터 기능할 것

const validateTweet = [
    body('text').trim().isLength({min:3}).withMessage('최소 3자 이상 입력'), validate
] // 위에 임포트 해온 body를 함수(메서드 체이닝)로 만들어서 쓸 것, isLength()함수: 길이췤 / body('text') 만족하지 못한다면 validate로 넘어가라
  // 여기 통과값이 미들웨어 밸리데이터.js > validate() 함수 error 값으로 들어감

  

// 1. 해당 아이디에 대한 트윗 가져오기 (어떤 아이디가 썼는지 모아보기 - 검색 )
// GET 방식으로 가져올 것
// http://127.0.0.1:8080/tweets?username=:username
router.get('/', tweetController.getTweets)


// 2. 글 번호에 대한 트윗 가져오기 (글 번호를 주면 트윗 가져오기, 하나만 가져옴)
// GET
// http://127.0.0.1:8080/tweets/:id
router.get('/:id',tweetController.getTweet)


// 3. 트윗하기
// POST (글을 보내는 것이므로)
// http://127.0.0.1:8080/tweets
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력
router.post('/', validateTweet, tweetController.createTweet)   // 유효성 체크 validateTweet 중간에 넣기


// 4. 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력
router.put('/:id', validateTweet, tweetController.updateTweet)


// 지피티형 (트위 수정 파트)
//router.put('/:id', (req, res, next) => {
//     const id = req.params.id; // URL 경로에서 id 추출
//     const text = req.body; // 요청 본문에서 수정할 트윗 내용 추출

//     // ID에 해당하는 트윗 찾기
//     const tweet = tweets.find((tweet) => tweet.id === id);

//     if (tweet) {
//         // 트윗 내용 업데이트
//         tweet.text = text || tweet.text; // 새 text가 없으면 기존 text 유지

//         res.status(201).json({
//             message: `트윗 ${id}이 수정되었습니다.`,
//             updatedTweet: tweet,
//         });
//     } else {
//         res.status(404).json({
//             message: `${id}에 해당하는 트윗이 없습니다.`,
//         });
//     }
// });



// 5. 트윗 삭제하기
// DELETE
// http://127.0.0.1:8080/tweets/:id
router.delete('/:id', tweetController.deleteTweet)

export default router  




// npm i express-validator 
// 회원 가입할 때 엉망인 데이터를 넣으면 혹은 서버로 직접 데이터 보내버리면 프론트에서 체크는 의미가 없음
// 서버 쪽에서도 validate 해야 되서 까는 미들 웨어