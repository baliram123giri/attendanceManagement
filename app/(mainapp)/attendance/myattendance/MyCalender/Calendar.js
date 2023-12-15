"use client"
// Calendar.js
import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import "./Calender.css"
import { MdCancel } from 'react-icons/md';
import { MdEventAvailable } from "react-icons/md";
import { HiCursorArrowRipple, HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";
import dynamic from 'next/dynamic';
const TimeWatch = dynamic(() => import('@/components/TimeWatch/TimeWatch'), { ssr: false })
import { GrInProgress } from "react-icons/gr";
import { useMutation } from '@tanstack/react-query';
import { addAttendance, attendanceList } from '../../services';
import { toast } from 'react-toastify';
import { baseURL } from '@/utils/utils';
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
const io = require("socket.io-client")
const Calendar = () => {
  //socket io

  //socketRef red 
  const socketRef = useRef(null)

  const [course, setCourse] = useState(null)

  const [currentDate, setCurrentDate] = useState(new Date());
  const joinHandler = () => {
    //emit attendance
    socketRef.current.emit("allAttendance", null)
  }

  //attendace list 
  const { mutate: muateAttendanceList, isLoading: isLoadingAttendanceList, data } = useMutation(attendanceList)


  const { mutate, isLoading } = useMutation(addAttendance, {
    onSuccess({ message }) {
      toast(message, { type: "success" })
      muateAttendanceList({ year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 })
    },
    onError({ response: { data: { message } } }) {
      toast(message, { type: "error" })
    },
    onSettled() {
      joinHandler()
    }
  })

  //  console.log(new Date("2023-10-11T18:30:00.000Z").toLocaleDateString("en-US"))
  function findFunctionAndUpdate(renderedDate) {

    const result = data?.find(({ date }) => {
      console.log("53", date)
      return new Date(date).toLocaleDateString("en-US") === renderedDate
    })
    return result
  }

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


  function getFullDate(date, month) {
    return new Date(currentDate.getFullYear(), month, date).toLocaleDateString()
  }

  const renderDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = startOfMonth(currentDate);

    const days = [];

    const lastMonthDays = startDay > 0 ? daysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)) : 0;


    // Add the days from the previous month
    for (let i = lastMonthDays - startDay + 1; i <= lastMonthDays; i++) {
      const month = currentDate.getMonth() - 1
      const isFound = findFunctionAndUpdate(getFullDate(i, month))
      const activeDate = getFullDate(i, month) === new Date()?.toLocaleDateString()

      days.push(
        <div key={`last_month_${i}`} className="day pb-1">
          <div className='flex items-center justify-between px-7 p-2'>
            <span className={`${isFound?.isPresent ? "text-main-app-error" : !isFound?.isPresent ? "text-red-500/80" : "text-main-app-primary"}  font - [500]  ${activeDate ? "p-1 bg-main-app-primary text-white rounded-full w-6 flex justify-center items-center h-6" : ""}`}> {i}</span>
            {isFound?.isPresent && <div className='text-xs flex items-center gap-1 flex-wrap text-green-500'><FaCheckCircle /> <span>Attended</span></div>}
            {!isFound?.isPresent && (new Date(currentDate.getFullYear(), month, i) < new Date()) && <div className={`text-xs flex items-center gap-1 flex-wrap ${activeDate ? "text-main-app-primary font-semibold" : "text-red-500/80"} `}>{activeDate ? <GrInProgress /> : <MdCancel />}<span>{activeDate ? "Waiting for join" : "Not Present"}</span></div>}
          </div>
          <div className='flex flex-wrap justify-between items-center'>
            {isFound?.course && <div className='text-[10px] bg-lime-200/50 my-1 text-lime-600 font-[500] inline-block  p-2 rounded mx-2'>{isFound?.course}</div>}
            {isFound?.isPresent && isFound?.time && <div className='text-xs my-1 ms-2 me-4'><span>{isFound?.time}</span></div>}
          </div>
        </div>
      );
    }

    // ${todayDate == i ? "bg-main-app-secondary/50 text-white" : ""}
    // Add the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      const month = currentDate.getMonth()
      const isFound = findFunctionAndUpdate(getFullDate(i, month))
      const activeDate = getFullDate(i, month) === new Date()?.toLocaleDateString()

      days.push(
        <div key={i} className={`day  pb-1  `}>
          <div className='flex items-center justify-between px-7 p-2'>
            <span className={`${isFound?.isPresent ? "text-main-app-error" : !isFound?.isPresent ? "text-red-500/80" : "text-main-app-primary"}  font - [500]  ${activeDate ? "p-1 bg-main-app-primary text-white rounded-full w-6 flex justify-center items-center h-6" : ""}`}> {i}</span>
            {isFound?.isPresent && <div className='text-xs flex items-center gap-1 flex-wrap text-green-500'><FaCheckCircle /> <span>Attended</span></div>}
            {!isFound?.isPresent && (new Date(currentDate.getFullYear(), month, i) < new Date()) && <div className={`text-xs flex items-center gap-1 flex-wrap ${activeDate ? "text-main-app-primary font-semibold" : "text-red-500/80"} `}>{activeDate ? <GrInProgress /> : <MdCancel />}<span>{activeDate ? "Waiting for join" : "Not Present"}</span></div>}
          </div>
          <div className='flex flex-wrap justify-between items-center'>
            {isFound?.course && <div className='text-[10px] bg-lime-200/50 my-1 text-lime-600 font-[500] inline-block  p-2 rounded mx-2'>{isFound?.course}</div>}
            {isFound?.isPresent && isFound?.time && <div className='text-xs my-1 ms-2 me-4'><span>{isFound?.time}</span></div>}
          </div>

          {/* {(i === 1 || i === 20) && <div className='text-[10px] mt-1 bg-blue-200/50 text-blue-600 font-[500] inline-block  p-2 rounded mx-2'>ReactJs Devlopement</div>}
          {(i === 5 || i === 24) && <div className='text-[10px] mt-1 bg-cyan-200/50 text-cyan-600 font-[500] inline-block  p-2 rounded mx-2'>Html, Css</div>} */}
        </div >
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

  const isJoined = findFunctionAndUpdate(getFullDate(new Date().getDate(), new Date().getMonth())) || currentDate.getMonth() !== new Date().getMonth()

  //call api
  useEffect(() => {
    muateAttendanceList({ year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 })
  }, [currentDate, muateAttendanceList])

  useEffect(() => {
    socketRef.current = io(baseURL);
    socketRef.current.emit("meeting", null)
    socketRef.current.on("meeting", (data) => {
      setCourse(data[0] || null)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {course && <div className=' shadow-sm my-2 bg-white flex items-center'>
        <div className='bg-main-app-error w-10 h-10 text-white flex justify-center items-center'><MdEventAvailable size={18} /></div>
        <h6 className='mx-2 text-sm'>{`"I'm joining the `} <span className='font-semibold'>{course?.course?.name}</span> class on <span className='font-semibold'>{course?.date}</span></h6>
        <div className='flex items-center gap-2 ms-auto text-sm text-main-app-primary font-semibold' >
          <TimeWatch />
          <button onClick={() => mutate({
            "isPresent": true,
            "course": course?.course?._id
          })} disabled={isJoined} className={`border not px-5 p-1 ms-auto flex items-center gap-1 ${isJoined ? "bg-main-app-secondary/50 cursor-not-allowed" : "bg-main-app-secondary "} me-2 shadow-md rounded text-white`}><HiCursorArrowRipple /> {isJoined ? "Joined" : isLoading ? "Loading" : `Join`}</button>
        </div >
      </div >}

      <div className="calendar bg-white">
        <div className="header">
          <button onClick={prevMonth} className='text-main-app-secondary'><HiMiniArrowLongLeft size={25} /></button>
          <h2>{currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
          {<button className={`${" text-main-app-secondary"}`} onClick={nextMonth}><HiMiniArrowLongRight size={25} /></button>}
        </div>
        <div className="days pb-4">
          <div className="day-label">Sun</div>
          <div className="day-label">Mon</div>
          <div className="day-label">Tue</div>
          <div className="day-label">Wed</div>
          <div className="day-label">Thu</div>
          <div className="day-label">Fri</div>
          <div className="day-label">Sat</div>
          {isLoadingAttendanceList ? <RotateLoader width={30} /> : renderDays()}
        </div>
      </div>
    </>
  );
};

export default Calendar;

