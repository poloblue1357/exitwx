import * as SunCalc from 'suncalc';

const T = {
    wrap:  { background: "rgba(88,86,214,0.12)", border: "1px solid rgba(88,86,214,0.28)", borderRadius: 12, padding: 16 },
    label: { color: "rgba(235,235,245,0.6)", fontSize: 13, fontWeight: 500 },
    value: { color: "#7D7AFF" },
    times: { color: "#7D7AFF" },
};

const formatTime = (time) => {
    if (!time) return '—';
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getMoonPhase = (phase) => {
    if (phase < 0.03 || phase > 0.97) return { emoji: '🌑', name: 'New Moon' };
    if (phase < 0.22)                 return { emoji: '🌒', name: 'Waxing Crescent' };
    if (phase < 0.28)                 return { emoji: '🌓', name: 'First Quarter' };
    if (phase < 0.47)                 return { emoji: '🌔', name: 'Waxing Gibbous' };
    if (phase < 0.53)                 return { emoji: '🌕', name: 'Full Moon' };
    if (phase < 0.72)                 return { emoji: '🌖', name: 'Waning Gibbous' };
    if (phase < 0.78)                 return { emoji: '🌗', name: 'Last Quarter' };
    return                                   { emoji: '🌘', name: 'Waning Crescent' };
};

function MoonInfo({ weatherInfo, lat, lon }) {
    const dt = weatherInfo?.dt;
    const localTime = dt ? new Date(dt * 1000) : new Date();

    const illum = SunCalc.getMoonIllumination(localTime);
    const percent = Math.round(illum.fraction * 100);
    const times = lat && lon ? SunCalc.getMoonTimes(localTime, lat, lon) : {};

    const moonPhase = getMoonPhase(illum.phase);

    return (
    <div style={T.wrap}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Moon emoji + phase name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 90 }}>
            <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 6 }}>{moonPhase.emoji}</div>
            <div style={{ ...T.label, fontSize: 12, textAlign: "center" }}>{moonPhase.name}</div>
        </div>

        {/* Illumination */}
        <div style={{ flex: 1, textAlign: "center", padding: "0 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, color: "rgba(235,235,245,0.5)" }}>
                Illumination
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, ...T.value }}>{percent}%</div>
        </div>

        {/* Rise / Set */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 80, alignItems: "flex-end" }}>
            <div>
            <div style={{ ...T.label, fontSize: 11, textAlign: "right" }}>Moonrise</div>
            <div style={{ fontSize: 14, fontWeight: 600, ...T.times }}>{formatTime(times.rise)}</div>
        </div>
        <div>
            <div style={{ ...T.label, fontSize: 11, textAlign: "right" }}>Moonset</div>
            <div style={{ fontSize: 14, fontWeight: 600, ...T.times }}>{formatTime(times.set)}</div>
        </div>
        </div>

        </div>
    </div>
    );
}

export default MoonInfo;