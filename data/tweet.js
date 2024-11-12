/* tweets.js 에서 데이터 여기로 다 옮김 */
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


// 모든 트윗을 리턴
export async function getAll(){
    return tweets
}


// 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return tweets.filter((tweet) =>  tweet.username == username)    
}


// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return tweets.filter((tweet) => tweet.id === id)    
}


// 트윗을 작성
export async function create(username, name, text) {
    const tweet = {
        id: '4',
        username: username,
        name: name,
        text: text,
        createdAt: Date.now().toString()
    }
    tweets = [tweet, ...tweets]
    return tweet
}

// 트윗을 변경
export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        tweet.text = text
    }    
    return tweet
}

// 트윗을 삭제
export async function remove(id) {
    tweets = tweets.filter((tweet => tweet.id !== id))    
}