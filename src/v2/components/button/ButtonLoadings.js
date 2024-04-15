import React, { memo } from 'react'

export const ButtonLoadings = memo(({ isLoading, handle, name }) => {
    return (
        <div
            className={
                !isLoading
                    ? 'long-operation-btn load-more'
                    : 'long-operation-btn load-more long-operation-started'
            }
            onClick={handle}
            // disabled={disable}
        >
            <span>{name || 'Xem thêm'}</span>
        </div>
    )
})
