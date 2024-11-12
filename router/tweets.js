// 트윗하는데 사용

import express from 'express'
import * as tweetController from '../controller/tweet.js'  // router. 안에 함수들을 컨트롤러 안에서 운영 예정

const router = express.Router() // 라우터 기능할 것

// data 있던 자리


// 여기까지 만들면 app.js 에서 가져 갈 수 있음
// 아래에 작업할 것들 뭐뭐 있을 지 생각


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
router.post('/', tweetController.createTweet)


// 4. 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력
router.put('/:id', tweetController.updateTweet)


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

