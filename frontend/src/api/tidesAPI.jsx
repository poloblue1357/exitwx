

export const fetchTidesData = async (lat, lon) => {

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    const params = new URLSearchParams ({
        lat, 
        lon,
    })

    const url = `${API_URL}/api/tides?${params}`

    try {
        const response = await fetch(url)

        if(!response.ok) {
            const errText = await response.text();
            console.error('tidesAPI error:', errText);
            throw new Error(`HTTP ${response.status}: ${errText}`)
        }
        const tidesData = await response.json()
        return tidesData

    } catch (error) {
        console.error('Tides API fetch failed', error)
        return null
    }
}