import { Button } from 'antd'
import React, { memo } from 'react'

export const AntButton = memo(
    ({
        type = 'primary',
        size = 'middle',
        icons = null,
        isLoading = false,
        handle,
        name = 'Click me!',
    }) => {
        return (
            <Button type={type} size={size} loading={isLoading} onClick={handle} icon={icons}>
                {name}
            </Button>
        )
    }
)
