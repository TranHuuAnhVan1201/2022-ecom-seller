import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";
// import FormNewee from "../Sale/page/Form/FormNewee";

// import "./default.scss";
// import "./rank.scss"
import "./test.scss";

// import image
import avatar from "../../../../../../newee/rank/avatar.png";
import upArrow from "../../../../../../newee/rank/up-arrow.png";
import downArrow from "../../../../../../newee/rank/down-arrow.png";
function RankBasic(props) {
    return (

          <div className="progress">
                <div className="progress_inner">
                    <div className="progress_inner__step">
                        <label htmlFor="step-1">Start order</label>
                    </div>
                    <div className="progress_inner__step">
                        <label htmlFor="step-2">Prepare gift</label>
                    </div>
                    <div className="progress_inner__step">
                        <label htmlFor="step-3">Pack gift</label>
                    </div>
                    <div className="progress_inner__step">
                        <label htmlFor="step-4">Decorate box</label>
                    </div>
                    <div className="progress_inner__step">
                        <label htmlFor="step-5">Send gift</label>
                    </div>
                    
                    <input defaultChecked="checked" id="step-1" name="step" type="radio" />
                    <input id="step-2" name="step" type="radio" />
                    <input id="step-3" name="step" type="radio" />
                    <input id="step-4" name="step" type="radio" />
                    <input id="step-5" name="step" type="radio" />
                    <div className="progress_inner__bar" />
                    <div className="progress_inner__bar--set" />
                    <div className="progress_inner__tabs">
                    <div className="tab tab-0">
                        <h1>LEVEL 0</h1>
                        <p className="title">Tham gia vào các chương trình promotion</p>
                        <p className="icon">X</p>
                        <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
                        <p className="icon">5%</p>
                        <p className="title">FreeShip đơn hàng tháng</p>
                        <p className="icon">10</p>
                        <p className="title">Tham gia Newee's Seller Day</p>
                        <p className="icon">10</p>
                        <p className="title">Tham gia Newee's Seller Day</p>
                    </div>
                    <div className="tab tab-1">
                        <h1>Prepare gift</h1>
                          <h1>LEVEL 0</h1>
                            <p className="title">Tham gia chương trình khuyến mãi</p>
                            <p className="icon">X</p>
                            <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
                            <p className="icon">5%</p>
                            <p className="title">FreeShip đơn hàng tháng</p>
                            <p className="icon">10</p>
                            <p className="title">Tham gia Newee's Seller Day</p>
                            <p className="icon">10</p>
                            <p className="title">Tham gia Newee's Seller Day</p>
                    </div>
                    <div className="tab tab-2">
                        <h1>Pack gift</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>
                    </div>
                    <div className="tab tab-3">
                        <h1>Decorate box</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>
                    </div>
                    <div className="tab tab-4">
                        <h1>Send gift</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>
                    </div>
                    </div>
                    <div className="progress_inner__status">
                    <div className="box_base" />
                    <div className="box_lid" />
                    <div className="box_ribbon" />
                    <div className="box_bow">
                        <div className="box_bow__left" />
                        <div className="box_bow__right" />
                    </div>
                    <div className="box_item" />
                    <div className="box_tag" />
                    <div className="box_string" />
                    </div>
                </div>
        </div>
        
        // <div className="rank">
        //     <div className="rank-header">
        //         <div className="d-flex-space-between col-lg-8 col-12">
        //             <div className="col-4 text-right">
        //                 <span class="text-right">Cấp bậc hiện tại <br/>của bạn</span>
        //             </div>
        //             <div className="col-4">
        //                 <img src={avatar} alt="Newee-asia avatar rank"></img>
        //             </div>
        //             <div className="col-4">
        //                 <h2>LEVEL 3</h2>
        //             </div>
        //         </div>
        //     </div>
           
        //     <div className="rank-body">
        //         <div className="rank-item ">
        //             <div className="rank-item-header">
        //                 <div className="rank-item-row">
        //                     <div className="col-number">
        //                         <p>01</p>
        //                         <p>02</p>
        //                         <p>03</p>
        //                         <p>04</p>
        //                         <p>05</p>
                                
        //                     </div>
        //                     <div className="col-check">
        //                         <p className="title">Tham gia chương trình khuyến mãi</p>
        //                         <p className="icon">X</p>
        //                         <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
        //                         <p className="icon">5%</p>
        //                         <p className="title">FreeShip đơn hàng tháng</p>
        //                         <p className="icon">10</p>
        //                         <p className="title">Tham gia Newee's Seller Day</p>
        //                         <p className="icon">10</p>
        //                         <p className="title">Tham gia Newee's Seller Day</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="rank-item-body">
        //                 <div className="btn-up-down">
        //                     <img src={upArrow} alt="newee-asia-icon-up-down" width={32} height={32}></img>
        //                 </div>
        //                 <div className="item-level btn btn-lg btn-outline-primary btn-block">
        //                     LEVEL 0
        //                 </div>
        //             </div>
        //             <div className="rank-item-footer">
        //                 <div className="rank-item-footer-up">up</div>
        //                 <div className="rank-item-footer-body">
        //                     <div className="title">Doanh thu tich luy</div>
        //                     <div className="content">KHÔNG ÁP DỤNG</div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* end rank-item */}
        //         <div className="rank-item ">
        //             <div className="rank-item-header">
        //                 <div className="rank-item-row">
        //                     <div className="col-number">
        //                         <p>01</p>
        //                         <p>02</p>
        //                         <p>03</p>
        //                         <p>04</p>
                                
        //                     </div>
        //                     <div className="col-check">
        //                         <p className="title">Tham gia chương trình khuyến mãi</p>
        //                         <p className="icon">X</p>
        //                         <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
        //                         <p className="icon">5%</p>
        //                         <p className="title">FreeShip đơn hàng tháng</p>
        //                         <p className="icon">10</p>
        //                         <p className="title">Tham gia Newee's Seller Day</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="rank-item-body">
        //                 <div className="btn-up-down">
        //                     <img src={upArrow} alt="newee-asia-icon-up-down" width={32} height={32}></img>
        //                 </div>
        //                 <div className="item-level btn btn-lg btn-outline-primary btn-block">
        //                     LEVEL 1
        //                 </div>
        //             </div>
        //             <div className="rank-item-footer">
        //                 <div className="rank-item-footer-up">up</div>
        //                 <div className="rank-item-footer-body">
        //                     <div className="title">Doanh thu tich luy</div>
        //                     <div className="content">KHÔNG ÁP DỤNG</div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* end rank-item */}
        //         <div className="rank-item ">
        //             <div className="rank-item-header">
        //                 <div className="rank-item-row">
        //                     <div className="col-number">
        //                         <p>01</p>
        //                         <p>02</p>
        //                         <p>03</p>
        //                         <p>04</p>
                                
        //                     </div>
        //                     <div className="col-check">
        //                         <p className="title">Tham gia chương trình khuyến mãi</p>
        //                         <p className="icon">X</p>
        //                         <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
        //                         <p className="icon">5%</p>
        //                         <p className="title">FreeShip đơn hàng tháng</p>
        //                         <p className="icon">10</p>
        //                         <p className="title">Tham gia Newee's Seller Day</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="rank-item-body">
        //                 <div className="btn-up-down">
        //                     <img src={upArrow} alt="newee-asia-icon-up-down" width={32} height={32}></img>
        //                 </div>
        //                 <div className="item-level btn btn-lg btn-outline-primary btn-block">
        //                     LEVEL 2
        //                 </div>
        //             </div>
        //             <div className="rank-item-footer">
        //                 <div className="rank-item-footer-up">up</div>
        //                 <div className="rank-item-footer-body">
        //                     <div className="title">Doanh thu tich luy</div>
        //                     <div className="content">KHÔNG ÁP DỤNG</div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* end rank-item */}
        //         <div className="rank-item ">
        //             <div className="rank-item-header">
        //                 <div className="rank-item-row">
        //                     <div className="col-number">
        //                         <p>01</p>
        //                         <p>02</p>
        //                         <p>03</p>
        //                         <p>04</p>
                                
        //                     </div>
        //                     <div className="col-check">
        //                         <p className="title">Tham gia chương trình khuyến mãi</p>
        //                         <p className="icon">X</p>
        //                         <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
        //                         <p className="icon">5%</p>
        //                         <p className="title">FreeShip đơn hàng tháng</p>
        //                         <p className="icon">10</p>
        //                         <p className="title">Tham gia Newee's Seller Day</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="rank-item-body">
        //                 <div className="btn-up-down">
        //                     <img src={upArrow} alt="newee-asia-icon-up-down" width={32} height={32}></img>
        //                 </div>
        //                 <div className="item-level btn btn-lg btn-outline-primary btn-block">
        //                     LEVEL 3
        //                 </div>
        //             </div>
        //             <div className="rank-item-footer">
        //                 <div className="rank-item-footer-up">up</div>
        //                 <div className="rank-item-footer-body">
        //                     <div className="title">Doanh thu tich luy</div>
        //                     <div className="content">KHÔNG ÁP DỤNG</div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* end rank-item */}
        //         <div className="rank-item ">
        //             <div className="rank-item-header">
        //                 <div className="rank-item-row">
        //                     <div className="col-number">
        //                         <p>01</p>
        //                         <p>02</p>
        //                         <p>03</p>
        //                         <p>04</p>
                                
        //                     </div>
        //                     <div className="col-check">
        //                         <p className="title">Tham gia chương trình khuyến mãi</p>
        //                         <p className="icon">X</p>
        //                         <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
        //                         <p className="icon">5%</p>
        //                         <p className="title">FreeShip đơn hàng tháng</p>
        //                         <p className="icon">10</p>
        //                         <p className="title">Tham gia Newee's Seller Day</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="rank-item-body">
        //                 <div className="btn-up-down">
        //                     <img src={upArrow} alt="newee-asia-icon-up-down" width={32} height={32}></img>
        //                 </div>
        //                 <div className="item-level btn btn-lg btn-outline-primary btn-block">
        //                     LEVEL 4
        //                 </div>
        //             </div>
        //             <div className="rank-item-footer">
        //                 <div className="rank-item-footer-up">up</div>
        //                 <div className="rank-item-footer-body">
        //                     <div className="title">Doanh thu tich luy</div>
        //                     <div className="content">KHÔNG ÁP DỤNG</div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* end rank-item */}



        //     </div>
        
        // </div>
    );
}

export default RankBasic;