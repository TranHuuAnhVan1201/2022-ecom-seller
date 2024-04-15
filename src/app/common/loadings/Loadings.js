import React from 'react'
import './loading.scss'

function Loadings(props) {
  return (
    <div className="container-loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loadings
