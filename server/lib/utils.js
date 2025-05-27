import jwt from "jsonwebtoken";


// token for user
const genToken = (id)=>{
    const token = jwt.sign({_id:id},process.env.JWT_SECRET_KEY)
    return token
}

export {genToken}