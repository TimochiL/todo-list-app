import React, { useState } from 'react'

const Navbar = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const [date, setDate] = useState(`${month} ${day}, ${year}`);
    const [time, setTime] = useState(today.toLocaleTimeString());

    const handleUpdateDate = () => {
        const t = new Date();
        const d = t.getDate();
        const m = t.toLocaleString('default', { month: 'long' });
        const y = t.getFullYear();

        setDate(`${m} ${d}, ${y}`)
    }
    const handleUpdateTime = () => {
        const t = new Date();
        setTime(t.toLocaleTimeString())
    }

    setInterval(handleUpdateTime, 1000);
    setInterval(handleUpdateDate, 1440000);

    return (
        <nav>
            <span className='date'>{date}</span>
            <span className='time'>{time}</span>
        </nav>
    )
}

export default Navbar