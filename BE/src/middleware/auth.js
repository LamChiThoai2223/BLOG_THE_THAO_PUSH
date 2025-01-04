const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();

async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
}

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Xác thực Google ID Token
        try {
            const decodedGoogleToken = await verifyGoogleToken(token);
            req.user = {
                google_id: decodedGoogleToken.sub,
                email: decodedGoogleToken.email,
                full_name: decodedGoogleToken.name,
                picture: decodedGoogleToken.picture,
                username: decodedGoogleToken.name
            };
            return next();
        } catch (googleTokenError) {
            // Nếu không phải Google Token, xử lý JWT
            try {
                const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decodedJWT; // Gán thông tin user vào request
                return next();
            } catch (jwtError) {
                return res.status(401).json({ msg: 'Token is not valid or expired' });
            }
        }
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
