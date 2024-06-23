import jwt from 'jsonwebtoken';



const isLoggedIn = (req, res, next) => {
    const {token} = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if(!token || !payload) {
        res.status(401).json({status: false, message: 'user is not loggedIn'});
    }

    req.user = {
        id: payload.id,
        name: payload.name,
        roles: payload.roles
    };

    next();
}

export default isLoggedIn;