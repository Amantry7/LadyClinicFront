'use client'

import dynamic from 'next/dynamic'


import { Spin } from 'antd'
import React from 'react'
import UserProfile from '@/features/profile/UI/ProfileHeader'

const page = () => {
    if (typeof window === undefined) {
        return <Spin />
    }
    return (
        <div>
            <UserProfile />
        </div>
    )
}

export default page
