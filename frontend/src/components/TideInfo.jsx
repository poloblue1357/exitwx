import tideMock from "./mock/tides.json";

function TideInfo({weatherInfo, lat, lon}) {

    const tideData = async () => {

        const API_URL = `https://www.worldtides.info/api/v3?extremes&localtime&lat=${lat}&lon=${lon}&key=${import.meta.env.VITE_WORLD_TIDES_API_KEY}`

        const data = await fetch(API_URL)

            

    }

    return (
        <div>

        </div>
    )
}

export default TideInfo