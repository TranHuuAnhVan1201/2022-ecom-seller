import React, { memo } from 'react'
import Loading from './Loading'
import './styles.css'
export const ButtonLoading = memo(({ loading, text, handleClick }) => {
    return (
        <button
            className="btn btn-row btn-flex-row btn-l btn-solid-primary"
            disabled={loading}
            onClick={handleClick}
        >
            {loading && <Loading name="info small" />}
            {!loading && <span>{text}</span>}
            {loading && <span className="ml-1">{text}</span>}
        </button>
    )
})
