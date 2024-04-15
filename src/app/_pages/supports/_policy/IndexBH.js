import React from 'react'
import '../_scss/Support.scss';

import logo from "../../../../newee/supports/qa.png";


export default function IndexBH() {
    return (
        <div className="sp-container-fluid">
            <section id="policy" className="py-lg-5 py-4">
                <div className="container">

                    <div className="col-lg-10 col-12 text-left m-auto sp-header">
                        <span className="hero px-md-4 px-2">CHÍNH SÁCH BẢO HÀNH
                        </span>

                        {/* <img height={90} width={90} src={logo} alt="Newee support"></img> */}

                    </div>
                    <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
                        <p className="policy-p"> Các sản phẩm hiện tại của Newee không áp dụng chính sách bảo hành. Chúng tôi sẽ cập nhật nếu có sự thay đổi.

                        </p>
                        <p className="policy-p"> Xin cảm ơn Qúy Nhà bán hàng.
                        </p>


                      


                       



    


                    </div>

                </div>
            </section>
        </div>
    )
}
