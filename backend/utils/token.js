import jwt from 'jsonwebtoken'

export const generateToken=(userId)=>{
  const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'24h'})
  console.log('Token generated is:',token)
  return token
}
