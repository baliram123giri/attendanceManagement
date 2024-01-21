"use client"
// AttendanceCalendar.js
import React, { useContext, useEffect, useMemo, useState } from 'react';
import './AttendanceCalendar.css';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/Provider/contexApi/AuthContext';
import { getAttendance } from '@/utils/utils';
import { weeklyAttendanceList } from '../services';
import PageLoader from '@/components/LoadingSpinner/PageLoader';
import { useSession } from 'next-auth/react';

const AttendanceCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const session = useSession()
  const { usersList } = useContext(AuthContext)
  const user = session?.data?.user
  const { data, mutate, isLoading } = useMutation(weeklyAttendanceList)

  const attendanceData = useMemo(() => getAttendance(data, usersList?.filter(({ _id }) => _id !== user?._id), startDate.toLocaleDateString("en-us")), [data, startDate, user?._id, usersList])

  // console.log(startDate.toISOString())
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

  useEffect(() => {
    const lastDate = new Date(startDate);
    lastDate.setDate(startDate.getDate() - 7);
    mutate({ today: startDate, lastDate })
  }, [mutate, startDate])
  if (isLoading) return <div className='py-5'> <PageLoader /></div>
  return (
    <div className="attendance-calendar">

      <div className="navigation-buttons flex items-center">
        <button onClick={handlePreviousWeek} className='bg-main-app-error me-2 cursor-pointer text-xs text-white px-4 py-2 rounded-sm '>Previous Week</button>
        {startDate < new Date() && <button className='bg-main-app-secondary text-xs text-white px-4 me-2 cursor-pointer py-2 rounded-sm ' onClick={handleNextWeek} disabled={startDate >= new Date()}>
          Next Week
        </button>}
        {startDate < new Date() && <button className='bg-main-app-primary text-xs text-white px-4 me-2 cursor-pointer py-2 rounded-sm ' onClick={() => setStartDate(new Date())} disabled={startDate >= new Date()}>
          Current Week
        </button>}
        <h2>Attendance for the Last 7 Days:</h2>
      </div>
      <div className=' overflow-auto w-full'>

        <table className="attendance-table ">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Name</th>
              {dateArray?.map((date, index) => (
                <th key={index}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData?.map((row, rowIndex) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
