import TheWeeklyAppointments from '@/components/appointments/TheWeeklyAppointments'
import TheAppointmentDashboard from '@/components/dashboard/TheAppointmentDashboard'
import React from 'react'

export default function page() {
  return (
    <div className='h-[81vh]'>
        <TheAppointmentDashboard />
    </div>
  )
}
