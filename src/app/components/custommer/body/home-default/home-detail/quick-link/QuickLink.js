import React from 'react'
import sale1 from '../../../../../../../newee/products/discount/1.jpg'
import sale2 from '../../../../../../../newee/products/discount/2.jpg'
import sale3 from '../../../../../../../newee/products/discount/3.jpg'
import sale4 from '../../../../../../../newee/products/discount/4.jpg'

function QuickLink(props) {
  return (
    <div className="quicks d-flex justify-content-center align-items-center flex-wrap py-2">
      <div className="card col-lg-2 col-md-3 col-6 py-2">
        <div>
          <img className="card-img-top m-auto" width={48} height={48} src={sale1} alt={'Newee'} />
        </div>
        <div className="card-body ">
          <p className="card-text ">Ưu đãi vận chuyển</p>
        </div>
      </div>
      <div className="card col-lg-2 col-md-3 col-6 py-2 mx-lg-2">
        <img className="card-img-top m-auto" width={48} height={48} src={sale2} alt={'Newee'} />
        <div className="card-body ">
          <p className="card-text ">Quà tặng</p>
        </div>
      </div>
      <div className="card col-lg-2 col-md-3 col-6 py-2">
        <img className="card-img-top m-auto " width={48} height={48} src={sale3} alt={'Newee'} />
        <div className="card-body ">
          <p className="card-text ">Thưởng nóng</p>
        </div>
      </div>
      <div className="card col-lg-2 col-md-3  col-6 py-2 mx-lg-2">
        <img className="card-img-top m-auto " width={48} height={48} src={sale4} alt={'Newee'} />
        <div className="card-body ">
          <p className="card-text ">Ưu đãi đối tác</p>
        </div>
      </div>
    </div>
  )
}

export default QuickLink
