import React, { useState, useEffect } from "react";

import Time from "./timer/Time";

const Timer = ({
    time,
    step,
    autoStart,
    active,
    defaultTime,
    onTick,
    onTimeEnd,
    onTimeStart,
    onTimePause,
}) => {
    const [isActive, setActive] = useState(active);
    const [currentTime, setTtime] = useState(time);
    const [isAutostart, switchOffAutostart] = useState(autoStart);
    const [hh, setHh] = useState("00");
    const [mm, setMm] = useState("00");
    const [ss, setSs] = useState("00");

    let timerId;

    if (isAutostart) {
        switchOffAutostart(false);
        setActive(true);
        onTimeStart();
    }

    useEffect(() => {
        if (isActive) {
            timerStart();
        }
        return () => {
            clearInterval(timerId);
        };
    });

    const timerToggler = () => {
        if (isActive) {
            clearInterval(timerId);
            onTimePause();
        } else {
            timerStart();
            onTimeStart();
        }
    };

    const timerStart = () => {
        timerId = setInterval(() => {
            if (currentTime) {
                setTtime(currentTime - step);
                timeFormatter(currentTime);
                onTick(currentTime);
            }
            if (currentTime < 1) {
                clearInterval(timerId);
                onTimeEnd();
                setActive(false);
                setTtime(defaultTime);
                timeFormatter(defaultTime);
            }
        }, step);
    };

    const timeFormatter = (time) => {
        let seconds = time / 1000;
        setHh(() => {
            if (Math.floor(seconds / 3600) < 10) {
                return "0" + Math.floor(seconds / 3600);
            } else return Math.floor(seconds / 3600);
        });
        setMm(() => {
            if (Math.floor((seconds % 3600) / 60) < 10) {
                return "0" + Math.floor((seconds % 3600) / 60);
            } else return Math.floor((seconds % 3600) / 60);
        });
        setSs(() => {
            if (Math.floor((seconds % 3600) % 60) < 10) {
                return "0" + Math.floor((seconds % 3600) % 60);
            } else return Math.floor((seconds % 3600) % 60);
        });
    };

    const randomColor = () => Math.floor(Math.random() * 255);

    return (
        <>
            <button
                onClick={() => {
                    setActive(!isActive);
                    timerToggler();
                }}
            >
                {isActive ? "Stop" : "Start"} timer
            </button>
            <Time
                hours={hh}
                minutes={mm}
                seconds={ss}
                timebarColor={`rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`}
                timebarWidth={currentTime + step}
                startTime={time}
                timebarStep={step / 1000}
            />
        </>
    );
};

export default Timer;
