'use client'

import dynamic from 'next/dynamic'
import { Spin } from 'antd'
import React from 'react'

const MedicalNewsPage = dynamic(() => import('@/features/news/Page'), {
  ssr: false,
  loading: () => <Spin />,
})

export default function MedicalNewsPageWrapper() {
  return <MedicalNewsPage />
}
