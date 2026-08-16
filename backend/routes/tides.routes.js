import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { lat, lng } = req.query
        const now = new Date()
        const end = new Date(now)
        end.setHours(end.getHours() + 24)

        if(!lat || !lng) {
            return res.status(400).json({ 
                error: 'Latitude and longitude are required' 
            })
        }

        const response = await axios.get(
            `https://api.stormglass.io/v2/tide/extremes/point`, 
            {
                params: {
                    lat,
                    lng,
                    start: now.toISOString(),
                    end: end.toISOString()
                },
                headers: {
                    'Authorization': process.env.STORMGLASS_API_KEY
                }
            })

        res.json(response.data)

    } catch (error) {
        const errorDetails = error.response?.data || error.message
        console.error('Stormglass API error', errorDetails)
        res.status(500).json({ 
            error: 'Failed to fetch tide data', 
            details: errorDetails 
        })
    }
})

export default router
