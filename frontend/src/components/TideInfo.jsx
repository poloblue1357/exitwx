import { useState, useEffect } from 'react';
import { fetchTidesData } from "../api/tidesAPI";

const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

const toFeet = (meters) => (meters * 3.28084).toFixed(2);

const getTideDirection = (type) => type === 'low' ? 'Falling' : 'Rising';

const WaveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5AC8FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    </svg>
);

function TideInfo({ lat, lon }) {
    const [currentTide, setCurrentTide] = useState(null);
    const [nextTide, setNextTide] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        async function fetchTide() {
        try {
            const data = await fetchTidesData(lat, lon);
            if (!data) throw new Error("No tide data for this location");

            const now = new Date();
            const upcoming = data.extremes.find(e => new Date(e.date) > now);
            if (!upcoming) throw new Error("No upcoming tide data");

            const afterThat = data.extremes.find(e => new Date(e.date) > new Date(upcoming.date));

            setCurrentTide({
                direction: getTideDirection(upcoming.type),
                type: upcoming.type,
                height: toFeet(upcoming.height),
                time: formatTime(upcoming.date),
            });

            if (afterThat) {
                setNextTide({
                    direction: getTideDirection(afterThat.type),
                    type: afterThat.type,
                    height: toFeet(afterThat.height),
                    time: formatTime(afterThat.date),
                });
            }} catch (err) {
                console.error("Tides API failed:", err);
                setError(err.message);
            }
        }

        fetchTide();
    }, [lat, lon]);

    if (error || !currentTide) return null;

    return (
        <div style={{ padding: "0 24px 12px", marginTop: "4px", marginBottom: "4px" }}>
        <div style={{ background: "rgba(90,200,250,0.12)", border: "1px solid rgba(90,200,250,0.25)", borderRadius: 12, padding: 16 }}>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <WaveIcon />
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.8)" }}>Tides</span>
            </div>

            <div style={{ display: "flex", gap: 16 }}>

            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.6)", marginBottom: 8 }}>Next {currentTide.type} tide</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#5AC8FA", marginBottom: 10 }}>{currentTide.direction}</div>
                <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Time</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(235,235,245,0.9)" }}>{currentTide.time}</div>
                </div>
                <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Height</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#5AC8FA" }}>{currentTide.height} ft</div>
                </div>
            </div>

            <div style={{ width: 1, background: "rgba(235,235,245,0.12)", alignSelf: "stretch" }} />

            {nextTide && (
                <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.6)", marginBottom: 8 }}>Then {nextTide.type} tide</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#5AC8FA", marginBottom: 10 }}>{nextTide.direction}</div>
                <div style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Time</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(235,235,245,0.9)" }}>{nextTide.time}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Height</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#5AC8FA" }}>{nextTide.height} ft</div>
                </div>
                </div>
            )}

            </div>
        </div>
        </div>
    );
}

export default TideInfo;