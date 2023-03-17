import express from 'express';
import { login, logout, register } from '../controller/auth.controller.js';
const router = express.Router();

// Register
router.post("/register",register);

// Login
router.post("/login",login);

// Logout
router.post("/logout",logout);

export default router;