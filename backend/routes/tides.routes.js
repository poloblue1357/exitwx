import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { lat, lon } = req.query

        if(!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' })
        }

        const apiKey = process.env.WORLD_TIDES_API_KEY
        const url = `https://www.worldtides.info/api/v3?extremes&localtime&lat=${lat}&lon=${lon}&key=${apiKey}`

        const response = await axios.get(url)
        res.json(response.data)

    } catch (error) {
        console.error('Tides API error', error.response?.data || error.message)
        res.status(500).json({ error: 'Failed to fetch tide data' })
    }
})

export default router
