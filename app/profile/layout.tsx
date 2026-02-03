'use client'

import dynamic from 'next/dynamic'

// Клиент-рендер только для дашборда (чтобы исключить SSR)
const DashboardLayout = dynamic(() => import('@/shared/components/Layout/Dashboard'), {
    ssr: false,
})

import { Spin } from 'antd'
import React from 'react'

const page = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    if (typeof window === undefined) {
        return <Spin />
    }
    return (
        <div>
            <DashboardLayout >{children}</DashboardLayout>
        </div>
    )
}

export default page
