import express from "express";
import { googleRegistration, googleRedirect } from "../controllers/googleAuthen.js";


const googleAuth = express.Router();

googleAuth.get("/google", googleRegistration);
googleAuth.get("/google-redirect", googleRedirect);

export default googleAuth;


