import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token)
        return res.status(401).json({
            error:"No Token Provided"
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SAAVi)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            error:"Invalid Token"
        })
    }
}

export default authMiddleware