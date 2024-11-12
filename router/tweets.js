// 트윗하는데 사용

import exress from 'express'

const router = express.Router() // 라우터 기능할 것


// 여기까지 만들면 app.js 에서 가져 갈 수 있음
// 아래에 작업할 것들 뭐뭐 있을 지 생각


// 1. 해당 아이디에 대한 트윗 가져오기 (어떤 아이디가 썼는지 모아보기 - 검색 )
// GET 방식으로 가져올 것
// http://127.0.0.1:8080/tweets?username=:username

// 2. 글 번호에 대한 트윗 가져오기 (글 번호를 주면 트윗 가져오기)
// GET
// http://127.0.0.1:8080/tweets/:id

// 3. 트윗하기
// POST (글을 보내는 것이므로)
// http://127.0.0.1:8080/tweets
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력

// 4. 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력

// 5. 트윗 삭제하기
// DELETE
// http://127.0.0.1:8080/tweets/:id





export default router  

