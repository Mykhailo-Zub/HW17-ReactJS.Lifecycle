import React from "react";

import Timer from "./components/Timer";

const timerSettings = {
    time: 15000,
    step: 1000,
    autostart: true,
    active: false,
};

function App() {
    const { time, step, autostart, active } = timerSettings;
    return (
        <div className="wrapper">
            <Timer
                time={time}
                step={step}
                autoStart={autostart}
                active={active}
                defaultTime={time}
                onTick={(time) => console.log("Time left: " + time + "ms")}
                onTimeEnd={() => console.log("Time is over!")}
                onTimeStart={() => console.log("Timer started")}
                onTimePause={() => console.log("Timer paused")}
            />
        </div>
    );
}

export default App;
