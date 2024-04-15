import React, { memo } from 'react'
import { Spins } from './Spins'

export const Spinner = memo(() => {
    return (
        <div className="newee-wrapper-sniper">
            <div className="full-width">
                {/*<div className="newee-long-operation-btn load-more long-operation-started address"></div>*/}

                <Spins />
                {/*<h4 className="pt-2">Đang tải...</h4>*/}
            </div>
        </div>
    )
})
