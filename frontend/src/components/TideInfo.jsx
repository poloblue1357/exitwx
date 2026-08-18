import { useState, useEffect } from 'react';
import { fetchTidesData } from "../api/tidesAPI";

const WaveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5AC8FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    </svg>
);

function TideInfo({ lat, lon, timezone }) {
    const [tide, setTide] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        async function fetchTide() {
            try {
                const data = await fetchTidesData(lat, lon, timezone);
                if (!data) throw new Error("No tide data for this location");

                setTide(data)

            } catch (err) {
                console.error("Tides API failed:", err);
                setError(err.message);
            }
        }

        fetchTide()

    }, [lat, lon, timezone]);

    if (error || !tide) return null;

    return (
        <div style={{ padding: "0 24px 12px", marginTop: "4px", marginBottom: "4px" }}>
        <div style={{ background: "rgba(90,200,250,0.12)", border: "1px solid rgba(90,200,250,0.25)", borderRadius: 12, padding: 16 }}>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <WaveIcon />
                <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.8)" }}>Tides</span>
            </div>

            <div style={{ display: "flex", gap: 16 }}>

            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.6)", marginBottom: 8 }}>Next {tide.current.status} tide</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#5AC8FA", marginBottom: 10 }}>{tide.next.type}</div>
                <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Time</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(235,235,245,0.9)" }}>{tide.next.time}</div>
                </div>
                <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Height</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#5AC8FA" }}>{tide.next.height} ft</div>
                </div>
            </div>

            <div style={{ width: 1, background: "rgba(235,235,245,0.12)", alignSelf: "stretch" }} />

            {tide.following && (
                <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.6)", marginBottom: 8 }}>Then {tide.current.status === 'high' ? 'Falling' : 'Rising'} tide</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#5AC8FA", marginBottom: 10 }}>{tide.following.type}</div>
                <div style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Time</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(235,235,245,0.9)" }}>{tide.following.time}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(235,235,245,0.4)", marginBottom: 2 }}>Height</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#5AC8FA" }}>{tide.following.height} ft</div>
                </div>
                </div>
            )}

            </div>
        </div>
        </div>
    );
}

export default TideInfo;