import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Card({ value }) {
  return (
    <div className="card">
      <LazyLoadImage
        alt={'Newee' + value.name}
        src={value.link}
        height={222}
        className="card-image"
      />

      <div className="card-content">
        <div className="card-top">
          <h3 className="card-title">{value.name}</h3>
          <div className="card-user">
            <div className="card-user-info">
              <div className="card-user-top">
                <h4 className="card-user-name">{value.price1}</h4>
              </div>
              <div className="card-user-top">
                <h4 className="card-user-name">{value.price1}</h4>
              </div>
              <div className="card-user-game">Chiết khấu: {value.percent}%</div>
              <div className="card-user-game">({value.moneyReceived})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
