import React, { useState, useEffect } from "react";

import Time from "./time/Time";

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
    const [currentTime, setCurrentTime] = useState(time);
    const [isAutostart, setIsAutostart] = useState(autoStart);
    const [hours, setHhours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    let timerId;

    useEffect(() => {
        if (isAutostart) {
            setIsAutostart(false);
            setActive(true);
            onTimeStart();
        }
    }, [isAutostart]);

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
                setCurrentTime(currentTime - step);
                timeFormatter(currentTime);
                onTick(currentTime);
            }
            if (currentTime < 1) {
                clearInterval(timerId);
                onTimeEnd();
                setActive(false);
                setCurrentTime(defaultTime);
                timeFormatter(defaultTime);
            }
        }, step);
    };

    const timeFormatter = (time) => {
        const seconds = time / 1000;
        setHhours(() => {
            if (Math.floor(seconds / 3600) < 10) {
                return "0" + Math.floor(seconds / 3600);
            } else return Math.floor(seconds / 3600);
        });
        setMinutes(() => {
            if (Math.floor((seconds % 3600) / 60) < 10) {
                return "0" + Math.floor((seconds % 3600) / 60);
            } else return Math.floor((seconds % 3600) / 60);
        });
        setSeconds(() => {
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
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                timebarColor={`rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`}
                timebarWidth={currentTime + step}
                startTime={time}
                timebarStep={step / 1000}
            />
        </>
    );
};

export default Timer;
