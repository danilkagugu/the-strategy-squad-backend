
import queryString from "query-string";
import axios from "axios";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL, FRONTEND_URL, SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

export const googleRegistration = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BACKEND_URL}/api/auth/google-redirect`,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent"
    });

    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`);
}

export const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;

    if (!code) {
        return res.status(400).json({ message: "Authorization code is missing" });
    }

    const tokenData = await axios({
        url: 'https://oauth2.googleapis.com/token',
        method: "post",
        data: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: `${BACKEND_URL}/api/auth/google-redirect`,
            grant_type: "authorization_code",
            code,
        },
    });

    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });

    const { email, name, picture } = userData.data;

    let user = await User.findOne({ email });

    if (!user) {
        const hashedPassword = await bcrypt.hash(name, 10);
        user = await User.create({
            email,
            name,
            password: hashedPassword,
            avatarURL: picture,
            googleId: userData.data.id,
            displayName: userData.data.name,
        });
    } else {
        await User.findOneAndUpdate(
            { email },
            { displayName: userData.data.name, googleId: userData.data.id }
        );
    }

    const userMongoDB = await User.findOne({ email });
    const payload = { id: userMongoDB._id, email: userMongoDB.email };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '30d' });

    await User.findByIdAndUpdate(userMongoDB._id, { token, refreshToken });

    return res.redirect(`${FRONTEND_URL}?email=${userData.data.email}&token=${token}&refreshToken=${refreshToken}`);



}

