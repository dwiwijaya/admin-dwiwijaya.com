import WithProtected from '@/hoc/withProtected'
import React from 'react'

const Dashboard = () => {
    return (
        <div>Welcome Back, Dwi</div>
    )
}

export default WithProtected(Dashboard)