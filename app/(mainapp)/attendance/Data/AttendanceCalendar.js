"use client"
// AttendanceCalendar.js
import React, { useState } from 'react';
import './AttendanceCalendar.css';

const AttendanceCalendar = ({ attendanceData = [
  {
    name: 'John Doe',
    attendance: {
      '2023-12-01': true,
      '2023-12-02': false,
      '2023-12-03': true,
      '2023-12-04': true,
      '2023-12-05': false,
      '2023-12-06': false,
      '2023-12-07': true,
    },
    time: '9:00 AM - 5:00 PM',
  },
  // Add more objects as needed
] }) => {
  
  const [startDate, setStartDate] = useState(new Date());

  const generateDateArray = (start) => {
    const dateArray = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() - index);
      return date.toISOString().split('T')[0];
    });
    return dateArray.reverse();
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const dateArray = generateDateArray(startDate);

  return (
    <div className="attendance-calendar">
      <h2>Attendance for the Last 7 Days:</h2>
      <div className="navigation-buttons">
        <button onClick={handlePreviousWeek}>Previous Week</button>
        <button onClick={handleNextWeek} disabled={startDate >= new Date()}>
          Next Week
        </button>
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>SrNo</th>
            <th>Name</th>
            {dateArray.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              <td>{row.name}</td>
              {dateArray.map((date, columnIndex) => (
                <td key={columnIndex}>
                  <span className={`check-icon ${row.attendance[date] ? 'present' : 'absent'}`}>
                    {row.attendance[date] ? '\u2713' : '\u2717'}
                  </span> 
                </td>
              ))}
              <td>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceCalendar;
