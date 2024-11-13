import { validationResult } from "express-validator";


// 공통적으로 데이터를 보내서 처리하는 함수 만들기 () > 라우터에 유효성 검사하는 함수랑 같이 쓸 예정
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){  // 데이터가 비어있다면이 아니고 "에러가 없다면"
        return next()
    }
    return res.status(400).json({message: errors.array()[0].msg}) // 에러메세지 중 첫번째꺼 가져와라
}

