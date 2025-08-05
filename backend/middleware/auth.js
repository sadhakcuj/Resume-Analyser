import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token verification failed, authorization denied' });
    }
}; 