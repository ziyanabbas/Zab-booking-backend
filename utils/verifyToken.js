import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = () => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(403, "You are not authenticated"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(400, "token is not valid"))
        }
        req.user = user
        return user;
    })
}
export const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
    }
    else {
        return next(createError(403, "You are not authenticated"))
    }
}
export const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    }
    else {
        return next(createError(403, "You are not authenticated"))
    }
}