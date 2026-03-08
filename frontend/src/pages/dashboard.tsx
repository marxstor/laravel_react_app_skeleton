import DashboardView from '@/components/pages/dashboard/dashboard-view'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import React from 'react'

const Dashboard = () => {
  useDocumentTitle('Dashboard')
  return (
    <>
      <DashboardView />
    </>
  )
}

export default Dashboard