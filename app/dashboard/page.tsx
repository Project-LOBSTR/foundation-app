'use client'

import Layout from '@/components/Layout'
import { useAppSelector } from '@/redux/store'

const Dashboard = () => {
  const userNpub = useAppSelector(({ publickey }) => publickey)

  console.log(userNpub)
  return (
    <Layout heading="Dashboard">
      <div></div>
    </Layout>
  )
}

export default Dashboard
