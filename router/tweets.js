// 트윗하는데 사용

import express from 'express'

const router = express.Router() // 라우터 기능할 것

/* 서버에 활용할 데이터가 없어서 배열로 만들어 놓기 */
let tweets = [
    {
        id:'1',
        name:'김사과',
        username:'apple',
        text:'안녕하세요',
        createdAt: Date.now().toString(),
        url: 'https://img.hankyung.com/photo/201904/ZA.19455953.1.jpg'
    },
    {
        id:'2',
        name:'오렌지',
        username:'orange',
        text:'안녕하세오렌지',
        createdAt: Date.now().toString(),
        url: 'https://images.squarespace-cdn.com/content/v1/66271db24df4cd422370803d/d5ea7fcd-6bf1-4f94-991b-b24d7574afaa/blog_2.png?format=1500w'
    },
    {
        id:'3',
        name:'김포도',
        username:'grape',
        text:'안녕하세요포도',
        createdAt: Date.now().toString(),
        url: 'https://images.squarespace-cdn.com/content/v1/66271db24df4cd422370803d/d5ea7fcd-6bf1-4f94-991b-b24d7574afaa/blog_2.png?format=1500w'
    }
]


// 여기까지 만들면 app.js 에서 가져 갈 수 있음
// 아래에 작업할 것들 뭐뭐 있을 지 생각


// 1. 해당 아이디에 대한 트윗 가져오기 (어떤 아이디가 썼는지 모아보기 - 검색 )
// GET 방식으로 가져올 것
// http://127.0.0.1:8080/tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username
    const data = username ? tweets.filter((tweet) => tweet.username == username) : tweets   // filter 하나씩 꺼내서 확인하는 메서드?
    res.status(200).json(data)
})

// 2. 글 번호에 대한 트윗 가져오기 (글 번호를 주면 트윗 가져오기, 하나만 가져옴)
// GET
// http://127.0.0.1:8080/tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    } else {
        res.status(200).json({message: `${id}의 트윗이 없습니다`})
    }
})



// 3. 트윗하기
// POST (글을 보내는 것이므로)
// http://127.0.0.1:8080/tweets
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력
router.post('/', (req, res, next) => {
    const { username, name, text } = req.body
    const tweet = {
        id: '4',
        username: username,
        name: name,
        text: text,
        createdAt: Date.now().toString()
    }
    tweets = [tweet, ...tweets]
    res.status(201).json(tweets)
})

// 4. 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// 데이터를 json 형태로 입력 후에 추가된 데이터까지 모두 json으로 출력
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const text = req.body.text
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet) {
        tweet.text = text
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
})

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
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  tweets = tweets.filter((tweet) => tweet.id !== id)   // filter로 돌리면서 id 일치하지 않는 것들만 tweets에 넣음
  res.status(200).json(tweets)   //200 주면 : (200).json(tweets) // 204주면 (204)까지만 쓰기
})

export default router  

