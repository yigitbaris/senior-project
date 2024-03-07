import Wrapper from '../assets/wrappers/DashboardFormPage'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = () => {
  const [selectedDates, setSelectedDates] = useState([])

  const handleDateClick = (date) => {
    const index = selectedDates.findIndex(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    )

    if (index === -1) {
      setSelectedDates([...selectedDates, date]) // Add date to array
    } else {
      const updatedDates = selectedDates.filter(
        (selectedDate) => selectedDate.getTime() !== date.getTime()
      )
      setSelectedDates(updatedDates) // Remove date from array
    }
  }

  const tileClassName = ({ date }) => {
    if (
      selectedDates.find(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      )
    ) {
      if (selectedDates.length === 1) {
        return 'selected-light-blue'
      } else if (selectedDates.length === 2) {
        return 'selected-dark-blue'
      }
    }
    return null
  }

  return (
    <Wrapper>
      <div className='calendar-wrapper'>
        <div className='calendar-container'>
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDates}
            tileClassName={tileClassName}
          />
        </div>
        <div className='selected-dates'>
          <h2>Selected Dates:</h2>
          <ul>
            {selectedDates.map((date, index) => (
              <li key={index}>{date.toDateString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

export default CalendarComponent
