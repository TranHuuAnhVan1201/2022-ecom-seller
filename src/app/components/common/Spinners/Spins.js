import { Loading3QuartersOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { memo } from 'react'

//const antIcon = <Loading3QuartersOutlined style={{ fontSize: 32 }} spin />

export const Spins = memo(() => {
    return <Spin size="large" tip="Đang tải..." />
})
