import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { lat, lng, timezone } = req.query
        console.log("TIDE QUERY:", req.query);
        console.log("TIDE ROUTE FILE IS RUNNING");

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

        const jsonData = response.data.data

        const formatTideTime = (tideTime, timezone) => {
            const localDate = new Date(
                new Date(tideTime).getTime() + Number(timezone) * 1000
            )

            return localDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                timeZone: 'UTC'
            })
        }
        
        const tide = {
            current: {
                status: jsonData[0].type === 'high' ? 'Rising' : 'Falling'
            },
            next: {
                height: Number((jsonData[0].height * 3.28084).toFixed(2)),
                type: jsonData[0].type,
                time: formatTideTime(jsonData[0].time, timezone)
            },
            following: {
                height: Number((jsonData[1].height * 3.28084).toFixed(2)),
                type: jsonData[1].type,
                time: formatTideTime(jsonData[1].time, timezone)
            }
        }

        res.json(tide)

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
