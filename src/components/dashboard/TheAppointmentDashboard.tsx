import React from 'react'
import TheWeeklyAppointments from '../appointments/TheWeeklyAppointments'

export default function TheAppointmentDashboard() {
  return (
    <div className='h-full bg-white rounded-lg overflow-y-auto'>
        <TheWeeklyAppointments />
    </div>
  )
}
