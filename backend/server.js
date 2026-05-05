import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import exitRoutes from "./routes/exitRoutes.js"
import weatherRoutes from "./routes/weatherRoutes.js"
import 'dotenv/config'; 
import geoRoutes from "./routes/geoRoutes.js"
import { rateLimit } from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 20, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Middleware
app.use(cors())
app.use(express.json())
app.use("/api/exits",limiter, exitRoutes)
app.use("/api/weather", limiter, weatherRoutes)
app.use('/api/geo', geoRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error", err))

    // Test route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})