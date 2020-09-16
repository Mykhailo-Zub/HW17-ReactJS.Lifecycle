import React from "react";

import style from "./Time.module.css";

const Time = ({
    hours,
    minutes,
    seconds,
    timebarColor,
    timebarWidth,
    startTime,
    timebarStep,
}) => (
    <>
        <div className={style.clock}>
            <span>{hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span className={style.seconds}>{seconds}</span>
        </div>
        <div
            style={{
                backgroundColor: `${timebarColor}`,
                width: `calc(${timebarWidth} * 100% / ${startTime})`,
                maxWidth: "100%",
                height: "80px",
                transition: `${timebarStep}s`,
            }}
        ></div>
    </>
);

export default Time;
