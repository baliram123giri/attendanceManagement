"use client"
// Calendar.js
import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import "./Calender.css"
import { MdCancel } from 'react-icons/md';
import { MdEventAvailable } from "react-icons/md";
import { HiCursorArrowRipple } from "react-icons/hi2";
import dynamic from 'next/dynamic';
const TimeWatch = dynamic(() => import('@/components/TimeWatch/TimeWatch'), { ssr: false })

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const startOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = startOfMonth(currentDate);
    const days = [];

    const lastMonthDays = startDay > 0 ? daysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)) : 0;

    // Add the days from the previous month
    for (let i = lastMonthDays - startDay + 1; i <= lastMonthDays; i++) {
      days.push(
        <div key={`last-month-${i}`} className="day">
          {i}
        </div>
      );
    }
    const todayDate = new Date().getDate()
    // ${todayDate == i ? "bg-main-app-secondary/50 text-white" : ""}
    // Add the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div key={i} className={`day  pb-1`}>
          <div className='flex items-center justify-between px-7 p-2'>
            <span className={`${i > 5 && i < 15 ? "text-main-app-error" : i > 15 && i < 30 ? "text-red-500/80" : "text-main-app-primary"}  font-[500]`}> {i}</span>
            {i >= 1 && i < 15 && <div className='text-xs flex items-center gap-1 flex-wrap text-green-500'><FaCheckCircle /> <span>Attended</span></div>}
            {i > 15 && i < 30 && <div className='text-xs flex items-center gap-1 flex-wrap text-red-500/80'><MdCancel /> <span>Not Present</span></div>}
          </div>
          {i === 10 && <div className='text-[10px] bg-lime-200/50 text-lime-600 font-[500] inline-block  p-2 rounded mx-2'>PHP Devlopement</div>}
          {(i === 1 || i === 20) && <div className='text-[10px] mt-1 bg-blue-200/50 text-blue-600 font-[500] inline-block  p-2 rounded mx-2'>ReactJs Devlopement</div>}
          {(i === 5 || i === 24) && <div className='text-[10px] mt-1 bg-cyan-200/50 text-cyan-600 font-[500] inline-block  p-2 rounded mx-2'>Html, Css</div>}
        </div>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  return (
    <>
      <div className=' shadow-sm my-2 bg-white flex items-center'>
        <div className='bg-main-app-error w-10 h-10 text-white flex justify-center items-center'><MdEventAvailable size={18} /></div>
        <h6 className='mx-2 text-sm'>{`"I'm joining the `} <span className='font-semibold'>{`HTML`}</span> class on <span className='font-semibold'>{new Date().toDateString()}</span></h6>

        <div className='flex items-center gap-2 ms-auto text-sm text-main-app-primary font-semibold'>
          <TimeWatch />
          <button className='border px-5 p-1 ms-auto flex items-center gap-1 bg-main-app-secondary me-2 shadow-md rounded text-white'><HiCursorArrowRipple /> Join</button>
        </div>
      </div>
      <div className="calendar bg-white">
        {/* <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div> */}
        <div className="days pb-4">
          <div className="day-label">Sun</div>
          <div className="day-label">Mon</div>
          <div className="day-label">Tue</div>
          <div className="day-label">Wed</div>
          <div className="day-label">Thu</div>
          <div className="day-label">Fri</div>
          <div className="day-label">Sat</div>
          {renderDays()}
        </div>
      </div>
    </>
  );
};

export default Calendar;

