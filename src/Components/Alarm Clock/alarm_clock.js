import React, { useState, useEffect } from 'react';
import './alarm_clock.css';
import Analogclock from "../Analog Clock/analog_clock";

function AlarmClock() {
    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [period, setPeriod] = useState('AM');
    const [alarms, setAlarms] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            let alarmsCopy = [...alarms];
            alarmsCopy.forEach((alarm, index) => {
                if (alarm.getTime() <= now.getTime()) {
                    alert('Wake Up!');
                    alarmsCopy = alarmsCopy.filter((_, i) => i !== index);
                }
            });
            setAlarms(alarmsCopy);
        }, 1000);

        return () => clearInterval(timer);
    }, [alarms]);

    const setAlarm = () => {
        const alarm = new Date();
        if (hour !== null && minute !== null) {
            alarm.setHours(period === 'AM' ? parseInt(hour) : parseInt(hour) + 12);
            alarm.setMinutes(parseInt(minute));
            setAlarms(prevAlarms => [...prevAlarms, alarm]);
        }
        else {
            alert('Please Choose time for Alarm!');
        }
    };

    const deleteAlarm = (index) => {
        setAlarms(prevAlarms => prevAlarms.filter((_, i) => i !== index));
    };


    return (
        <div className='clock_container'>

            <h2>Alarm Clock</h2>
            <p>Current Time: {currentTime.toLocaleTimeString()}</p>
            <Analogclock />
            <div className='setAlarm-container'>
                <label htmlFor="alarmTime">Set Alarm for:</label>
                <div className='input-container'>
                    <input className='inputs' type="number" min="1" max="12" onChange={e => setHour(e.target.value)} placeholder="Hour" />
                    <input className='inputs' type="number" min="0" max="59" onChange={e => setMinute(e.target.value)} placeholder="Minute" />
                    <select className='inputs' onChange={e => setPeriod(e.target.value)}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                <button className='inputs btn_submit' onClick={setAlarm}>Set Alarm</button>
            </div>
            <h3>Alarms</h3>
            <ul className='alarm_list_container'>
                {alarms.map((alarm, index) => (
                    <li key={index}>
                        {alarm.toLocaleTimeString()}
                        <button className='inputs btn_delete' onClick={() => deleteAlarm(index)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default AlarmClock;
