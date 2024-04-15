import React from 'react'
import '../_scss/Support.scss';
import line from "../../../../newee/supports/line.svg"
import logo from "../../../../newee/supports/reports.png";

export default function Index() {


    return (
        <div className="sp-container-fluid">
            <section id="policy" className="py-lg-5 py-4">
                <div className="container">
                    <div className="col-lg-10 col-12 text-left m-auto sp-header">
                        <span className="hero px-md-4 px-2">QUY ĐỊNH ĐỔI TRẢ VÀ XỬ LÝ KHIẾU NẠI
                        </span>

                        <img height={90} width={90} src={logo} alt="Newee support"></img>

                    </div>
                    <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
                        <p className="policy-title"> 1.	Lưu ý trước khi mở hàng
                        </p>
                        <p className="policy-p">Đơn hàng của khách hàng có thể xảy ra vấn đề hỏng hóc, rơi vỡ, móp méo trong quá trình vận chuyển và giao nhận. Do đó, quý đối tác nên thông báo với khách hàng của mình quay clip khi mở đơn hàng để lưu trữ bằng chứng về sản phẩm.
                        </p>
                        <p className="policy-title">2. Quy trình khiếu nại/ đổi hàng hóa
                        </p>
                        <p className="policy-p">Bước 1: Bạn vui lòng gọi hotline 0337.456.729 và gửi email tới hòm thư tiếp nhận khiếu nại của công ty là: seller@newee.asia (sử dụng email mà Bạn đã đăng ký Nhà bán hàng Online trên website của Newee) theo cú pháp như sau:
                        </p>

                        <div className="col-lg-10 col-md-8 col-12 py-2 m-auto">
                            <div className="row sp-card py-4 ">
                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Tiêu đề mail: [Mã cộng tác viên] - Khiếu nại hàng hóa.</div>
                                </div>
                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Mã đơn hàng. </div>
                                </div>

                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Lý do khiếu nại.</div>
                                </div>

                                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                                    <div className="col-left mr-2"><img src={line} alt="Newee supports"></img></div>
                                    <div className="col-right">Clip/ Hình ảnh thực trạng sản phẩm và các hình ảnh liên quan cần khiếu nại.</div>
                                </div>



                            </div>
                        </div>

                        <p className="policy-p">Bước 2: Newee sẽ tiếp nhận các khiếu nại, liên hệ làm rõ các yêu cầu của bạn trong thời gian sớm nhất có thể và không quá 5 ngày làm việc, kể từ ngày nhận được yêu cầu. Tùy theo tính chất và mức độ của sự việc, Newee sẽ có những biện pháp cụ thể để hỗ trợ bạn giải quyết khiếu nại, tranh chấp.
                        </p>
                        <p className="policy-title">3. Thời gian tiếp nhận và xử lý khiếu nại
                        </p>
                        <p className="policy-p">Newee chỉ tiếp nhận và xử lý mọi yêu cầu khiếu nại được xác định là hợp lệ (gửi đúng thời gian và cách thức). Thời gian chịu trách nhiệm giải quyết khiếu nại là 72h kể từ thời điểm đơn vị vận chuyển xác nhận giao hàng thành công.
                        </p>
                        <p className="policy-p">Thời gian phản hồi: Phản hồi về việc tiếp nhận/yêu cầu bổ sung thông tin trong vòng từ 1 – 3 ngày.
                        </p>




                    </div>

                </div>
            </section>
        </div>
    )
}
