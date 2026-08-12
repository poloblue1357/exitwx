import tideMock from "../mock/tides.json";
import { fetchTidesData } from "../api/tidesAPI";
import { useState, useEffect } from 'react'

function TideInfo({ lat, lon }) {

    const [ tide, setTide ] = useState('')
    const [ nextTide, setNextTide ] = useState('')

    useEffect(() => {

        async function fetchTide() {
            try {
                
                const data = await fetchTidesData(lat, lon)
                
                if (!data) throw new Error("This lat,lon has no data")

                setTide(data)
                console.log(tide)
    
            } catch (error) {
                console.log("Tides API failed", error)
            }
        }
        
        fetchTide()

    }, [lat, lon])

    // const now = new Date()
    // const height = (tideMock.extremes[0].height * 3.28084).toFixed(2)
    // const heightPlusOne = (tideMock.extremes[1].height * 3.28084).toFixed(2)

    // const time = nextTide.toLocaleTimeString([], {
    //     hour: 'numeric',
    //     minute: '2-digit'
    // })
    // const tidePlusOne = new Date(tideMock.extremes[1].date)
    // const timePlusOne = tidePlusOne.toLocaleTimeString([], {
    //     hour: 'numeric',
    //     minute: '2-digit'
    // })
    // const type = tideMock.extremes[0].type
    // let x
    // let y

    // if(type === 'Low') {
    //     x = 'Rising'
    //     y = 'High'
    // } else {
    //     x = 'Falling'
    //     y = 'Low'
    // }

    // let z = new Date(now - nextTide)

    return (
        <div style={{ padding: "24px 24px 0", paddingBottom: '12px' }}>
            {/* <div>Tide: {x}</div>
            <div>
                <div>Next: {tideMock.extremes[0].type}</div>
                <div>{time}</div>
                <div>{height} ft</div>
            </div>
            <div>
                <div>After that: {y}</div>
                <div>{timePlusOne}</div>
                <div>{heightPlusOne} ft</div>
            </div> */}
            {/* <div>{tideMock.extremes[0].type} tide in {z}</div> */}
        </div>
    )
}

export default TideInfo

// 🌊 Tide

// Rising

// Next: HIGH
// 6:23 PM
// 1.34 ft

// After that: LOW
// 12:30 AM
// -1.10 ft

// High tide in 2h 15m