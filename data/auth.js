// 사용자 데이터 추가

let users = [
    {
        id:'1',
        username: 'apple',
        password: '$2b$10$Ahv4Kr0HpbU/6ktAEfNsEeAIkNIrInmLdboWcwDVGAGalKK45Q1rG', 
        name: '김사과',
        email: 'apple@apple.com',
        url:'https://library.ltikorea.or.kr/rest/content/thumbnail/14957?target=default&width=300&height=300'
    },
    {
        id:'2',
        username: 'banana',
        password: '2222',
        name: '반하나',
        email: 'banana@banana.com',
        url:'https://m.koreaart.ac.kr/cdn/hac/board/2003/20200214111803_0.jpg'
    },
    {
        id:'3',
        username: 'orange',
        password: '3333',
        name: '오현지',
        email: 'orange@orange.com',
        url:'https://menu.moneys.co.kr/moneyweek/thumb/2021/01/19/06/2021011909078097650_1.jpg/dims/optimize/'
    }
]

export async function createUser(username, password, name, email) {
    const user ={
        id:'4',
        username, // 자바스크립트에서 매개변수랑 인수랑 같게 놓을거면 하나로 써도 됨 (username, password 적용)
        password,
        name: name,
        email: email,
        url:'https://menu.moneys.co.kr/moneyweek/thumb/2021/01/19/06/2021011909078097650_1.jpg/dims/optimize/'
    }
    users = [user, ...users]
    return user
}

// export async function login(username) {
//     const user = users.find((user) => user.username === username)
//     return user
// }
// 위 함수를 사람이 있는지 없는지 확인하는거로 바꿈
export async function findByUsername(username) {
    const user = users.find((user) => user.username === username)
    return user
}

export async function findById(id){
    return users.find((user) => user.id === id)
}