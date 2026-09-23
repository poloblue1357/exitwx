import express from "express";
import User from "../models/user.model.js";
import { z } from "zod";

const router = express.Router();

// Validation schemas
const RegisterSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
    referredBy: z.string().optional().nullable()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
});

// REGISTER endpoint
router.post("/register", async (req, res) => {
    try {
        // Validate input
        const validatedData = RegisterSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: validatedData.email },
                { username: validatedData.username }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                error: "User already exists with that email or username"
            });
        }

        // Create new user
        const newUser = new User({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            username: validatedData.username,
            password: validatedData.password,
            referredBy: validatedData.referredBy || null
        });

        const savedUser = await newUser.save();

        // Return user info (without password)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                username: savedUser.username
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors
            });
        }

        console.error("Registration error:", error);
        res.status(500).json({
            error: error.message || "Registration failed"
        });
    }
});

// LOGIN endpoint
router.post("/login", async (req, res) => {
    try {
        // Validate input
        const validatedData = LoginSchema.parse(req.body);

        // Find user by username
        const user = await User.findOne({ username: validatedData.username });

        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        // Compare passwords
        const isPasswordValid = await user.comparePassword(validatedData.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        // Login successful
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors
            });
        }

        console.error("Login error:", error);
        res.status(500).json({
            error: error.message || "Login failed"
        });
    }
});

export default router;
