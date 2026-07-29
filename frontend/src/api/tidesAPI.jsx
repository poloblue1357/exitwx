

export const fetchTidesData = async (lat, lon) => {

    const url = `https://www.worldtides.info/api/v3?extremes&localtime&lat=${lat}&lon=${lon}&key=${import.meta.env.VITE_WORLD_TIDES_API_KEY}`

    try {
        const response = await fetch (url)

        if(!response.ok) {
            const errText = await response.text();
            console.error('geoAPI error:', errText);
            throw new Error(`HTTP ${response.status}: ${errText}`)
        }
        const tidesData = await response.json()
        return tidesData

    } catch (error) {
        console.error('Tides API fetch failed', error)
        return null
    }
}