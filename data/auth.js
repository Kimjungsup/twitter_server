// 사용자 데이터 추가

let users = [
    {
        id:'1',
        username: 'apple',
        password: '1111',
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
        username: username,
        password: password,
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
// 위 함수를 사람이 잇는지 없는지 확인하는거로 바꿈
export async function findByUsername(username) {
    const user = users.find((user) => user.username === username)
    return user
}