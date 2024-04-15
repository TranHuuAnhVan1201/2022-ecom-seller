import React, { useState } from 'react'
import '../_scss/Support.scss';
import line from "../../../../newee/supports/line.svg"
import logo from "../../../../newee/supports/dathang.png";
import btnClose from "../../../../newee/button/times-solid.svg";

export default function Index() {
    // const [check, setCheck] = useState(false);
    // const handleClick = () => {
    //     setCheck(!check);
    // }


    return (
        <div className="sp-container-fluid">
            <section id="policy" className="py-lg-5 py-4">
                <div className="container">
                    <div className="col-lg-10 col-12 m-auto pb-4">
                        <iframe width="100%" height="500px" id="player-1" src="https://www.youtube.com/embed/9oGhAkQLfI0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        
                    </div>

                    <div className="col-lg-10 col-12 text-left m-auto sp-header">
                        <span className="hero px-md-4 ">QUY ĐỊNH ĐẶT HÀNG
                        </span>

                        <img height={90} width={75} src={logo} alt="Newee support"></img>

                    </div>
                    <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
                        <p className="policy-title"> 1. Cách thức đặt hàng:
                        </p>
                        <p className="policy-p">Quý đối tác có thể đọc và làm theo hướng dẫn cụ thể các bước trong mục "Hướng dẫn" hoặc liên hệ hotline: 0337.456.729 và/hoặc gửi thông tin về email seller@newee.asia để được nhân viên của chúng tôi hướng dẫn chi tiết.
                        </p>
                        <p className="policy-p">Có biện pháp xử lý kịp thời khi phát hiện hoặc nhận được phản ánh về hành vi
                            kinh doanh vi phạm pháp luật.
                        </p>
                        <p className="policy-title">
                            *  Lưu ý:
                        </p>
                        <p className="policy-p">
                            Quý đối tác vui lòng điền đầy đủ thông tin khi đăng ký Seller như sau để Newee có thể chủ động liên lạc trao đổi thêm trong trường hợp đơn hàng có sản phẩm hết hàng, gửi kết quả đặt hàng, quyết toán doanh thu hoặc cần trao đổi thêm về các thông tin khác.
                        </p>
                        <div className="col-lg-7 col-md-8 col-12 py-2 m-auto">
                            <div className="row sp-card py-4 ">
                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Họ và tên</div>
                                </div>
                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Số điện thoại (Có nick Zalo) </div>
                                </div>

                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Số chúng minh nhân dân</div>
                                </div>

                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Email</div>
                                </div>



                            </div>
                        </div>
                        <p className="policy-p">
                            Khi tạo lập đơn hàng, bạn vui lòng điền đầy đủ thông tin liên hệ (như họ tên, số điện thoại của người nhận hàng và địa chỉ nhận hàng) để Newee thuận tiện trong quá trình lên đơn hàng và thông báo các thông tin tới khách hàng của bạn một cách nhanh nhất.
                        </p>


                        <p className="policy-title">1.2. Thông tin khác:

                        </p>
                        <p className="policy-p">
                            Trường hợp khách hàng của bạn mua thêm hàng hoá mà bạn lên đơn trên hệ thống, bạn vui lòng gọi điện thoại qua số hotline của Newee 0337.456.729 để được hỗ trợ.
                        </p>
                        <p className="policy-p">
                            Trường hợp khách hàng cần hỗ trợ đơn hàng trong thời gian ngắn hoặc cần đặt số lượng sỉ thì quý đối tác có thể liên hệ với Newee qua hotline để được hỗ trợ nhanh nhất.
                        </p>
                    </div>
























                </div>
            </section>
        </div>
    )
}
