import React, { useEffect, useState } from 'react';
import './analog_clock.css';

const Analog_clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const secondsStyle = {
        transform: `rotate(${date.getSeconds() * 6 + date.getMilliseconds() * 0.006}deg)`
    };

    const minutesStyle = {
        transform: `rotate(${date.getMinutes() * 6 + date.getSeconds() * 0.1 + date.getMilliseconds() * 0.0001}deg)`
    };

    const hoursStyle = {
        transform: `rotate(${date.getHours() * 30 + date.getMinutes()*.5 + date.getSeconds() * 0.00833 + date.getMilliseconds() * 0.00000833}deg)`
    };

    return (
        <div className="clock">
            <div className="center-dot"></div>
            <div className="t t-12">12</div>
            <div className="t t-6">6</div>
            <div className="t t-9">9</div>
            <div className="t t-3">3</div>
            <div className="line-container" style={secondsStyle} id="sec">
                    <div className="line">
                        <div className="tip"></div>
                     </div>
                 </div>
                 <div className="line-container" style={minutesStyle} id="min">
                     <div className="line">
                        <div className="tip"></div>
                     </div>
                 </div>
                 <div className="line-container" style={hoursStyle} id="hrs">
                     <div className="line">
                        <div className="tip"></div>
                    </div>
                </div>
        </div>
    );
};

export default Analog_clock;