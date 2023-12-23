// install dependencies
import jwt from 'jsonwebtoken';

// token verification
export const verifyToken = async (req, res, next) => { 

    try {
        
        // get the token
        let token = req.header("Authorization");

        // not a valid token - denied acess
        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) { 
            // get the token signature
            token = token.slice(7, token.length).trimLeft();
        }

        // process and validate token signature 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // user is verified
        req.user = verified;
        next();     // run next function on middleware stack
    } catch (err) {
        // token not verified
        res.status(500).json({ error: err.message });
    }
}