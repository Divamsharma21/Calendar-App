// src/Calendar.js
import React, { useState, useEffect } from 'react';
import './Calendar.css';

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const addEvent = (date) => {
        const eventName = prompt("Enter event name:");
        if (eventName) {
            setEvents([...events, { date: date.toDateString(), name: eventName, color: getRandomColor() }]);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const renderDays = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const days = [];

        for (let i = 0; i < startOfMonth.getDay(); i++) {
            days.push(<div className="day empty" key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= endOfMonth.getDate(); day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
            days.push(
                <div className="day" key={day} onClick={() => addEvent(date)}>
                    <div className="date">{day}</div>
                    {event && <div className="event" style={{ backgroundColor: event.color }}>{event.name}</div>}
                </div>
            );
        }

        return days;
    };

    return (
        // <div className="calender-box">

        
        <div className="calendar">
            <header>
                <button onClick={handlePrevMonth}>Previous</button>
                <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </header>
            <div className="days">
                {daysInWeek.map(day => <div className="day" key={day}>{day}</div>)}
                {renderDays()}
            </div>
        </div>
      
    );
};

export default Calendar;


 