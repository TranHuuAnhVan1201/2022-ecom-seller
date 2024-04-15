import React from 'react'
import './FormBank.scss';
import line from "../../../../../../newee/supports/line.svg"
import logo from "../../../../../../newee/supports/thanhtoan.png";
import logo2 from "../../../../../../newee/supports/vanchuyen.png";

export default function Index() {


    return (
        <div className="sp-container-fluid">
            <div id="policy" className="py-lg-5 py-4">
                <div className="container">
                   
                    <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
                        

                        <div className="col-lg-10 col-md-8 col-12 py-2 m-auto">
                            <div className="row sp-card py-4 ">
                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right"><span style={{fontWeight: '200'}}>Tên tài khoản: </span>CÔNG TY TNHH TIẾP THỊ SÁNG TẠO ĐIỂM</div>
                                </div>
                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right"><span style={{ fontWeight: '200' }}>Số tài khoản: </span>  09111.0555.8888. </div>
                                </div>

                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right"><span style={{ fontWeight: '200' }}>Ngân hàng: </span>  MB Bank - Chi Nhánh: Bình Thạnh, TP.HCM.</div>
                                </div>
                            </div>
                        </div>
                     




                    </div>

                </div>
            </div>
        </div>
    )
}
