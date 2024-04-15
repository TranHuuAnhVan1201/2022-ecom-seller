import React from "react";
import line from "../../../../newee/supports/line.svg";
import logo from "../../../../newee/supports/thanhtoan.png";
import logo2 from "../../../../newee/supports/vanchuyen.png";
import "../_scss/Support.scss";

export default function Index() {
  return (
    <div className="sp-container-fluid">
      <section id="policy" className="py-lg-5 py-4">
        <div className="container">
          <div className="col-lg-10 col-12 text-left m-auto sp-header">
            <span className="hero px-md-4 px-2">CÁCH THỨC VẬN CHUYỂN</span>

            <img height={90} width={90} src={logo2} alt="Newee support"></img>
          </div>
          <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
            <p className="policy-title">1. Chính sách vận chuyển:</p>
            <p className="policy-p">
              - Newee giao hàng tận nơi cho khách hàng của NBH và có tính phí
              vận chuyển.
            </p>
            <p className="policy-p">
              - Phí giao hàng sẽ được tính sau khi NBH điền thông tin giao nhận
              ở trang đặt hàng.
            </p>
            <p className="policy-title">
              2. Newee hiện có chi phí giao hàng cơ bản của 1 đơn hàng như sau:
            </p>
            <div className="col-lg-10 col-md-8 col-12 py-2 m-auto">
              {/* <div className="row sp-card py-4 ">
                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                  <div className="col-left mr-2">
                    <img src={line} alt="Newee supports"></img>
                  </div>
                  <div className="col-right">
                    <span style={{ fontWeight: "200" }}>
                      Phí giao hàng nội thành:{" "}
                    </span>
                    20.000 ₫/đơn
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                  <div className="col-left mr-2">
                    <img src={line} alt="Newee supports"></img>
                  </div>
                  <div className="col-right">
                    <span style={{ fontWeight: "200" }}>
                      Phí giao hàng ngoại thành:{" "}
                    </span>
                    35.000 ₫/đơn
                  </div>
                </div>
              </div> */}
            </div>
            <p className="policy-p">
              - Thời gian giao hàng: Từ 02 đến 05 ngày làm việc.
            </p>

            <p className="policy-p">
              - Thông thường, thời gian giao hàng nội thành HCM sẽ từ 1-3 ngày
              (vui lòng cộng thêm 2 ngày nếu khách hàng đặt sau 15h ngày thứ 6
              hoặc thứ 7, cộng thêm 1 ngày nếu khách hàng đặt ngày CN)
            </p>
            <p className="policy-p">
              - Thời gian giao hàng ở các tỉnh, thành khác sẽ dao động từ 2-5
              ngày tùy thuộc vào địa chỉ nhận hàng của khách hàng.
            </p>
            <p className="policy-p">
              - Trong trường hợp khách hàng ở HCM và có nhu cầu nhận hàng gấp
              trong ngày (từ 9h00-18h00, thứ 2 đến thứ 6), Newee hỗ trợ ship qua
              Grab và Lalamove. Xin vui lòng liên hệ số hotline 033 745 6729 để
              được tư vấn.
            </p>

            <p className="policy-title">3. Thời gian chuẩn bị hàng:</p>

            <p className="policy-p">
              - Giờ làm việc của Newee là từ 9h00 - 18h00, thứ 2 đến thứ 6 hàng
              tuần.
            </p>

            <p className="policy-p">
              - Chúng tôi sẽ xử lý đơn hàng của quý khách chậm nhất trong vòng 1
              ngày làm việc và giao cho đơn vị vận chuyển.
            </p>

            <p className="policy-p">
              - Đơn hàng sẽ được tự động xác nhận. Nếu có bất cứ chỉnh sửa nào
              về số lượng sản phẩm hoặc phí giao hàng, Newee sẽ liên hệ với NBH
              để cung cấp trong thông tin đặt hàng để xác nhận lại.
            </p>

            <p className="policy-title">
              4. Cách kiểm tra tình trang đơn hàng:
            </p>
            <p className="policy-p"></p>
            <p className="policy-p">
              Thời gian phản hồi: Phản hồi về việc tiếp nhận/yêu cầu bổ sung
              thông tin trong vòng từ 1 – 3 ngày.
            </p>
            <p className="policy-p">
              Trường hợp bạn muốn cập nhật thông tin nhanh nhất thì có thể liên
              hệ với Newee qua số hotline trên website để được hỗ trợ.
            </p>
          </div>
          <div className="col-lg-10 col-12 text-left m-auto sp-header">
            <span className="hero px-md-4 px-2">CÁCH THỨC THANH TOÁN</span>

            <img height={90} width={90} src={logo} alt="Newee support"></img>
          </div>
          <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
            <p className="policy-p">
              Newee hiện có các phương thức thanh toán như sau:
            </p>
            <p className="policy-title">1. Thanh toán tiền mặt:</p>
            <p className="policy-p">
              - NBH có thể cho Khách hàng của mình thanh toán giá trị đơn hàng
              bằng hình thức tiền mặt ngay khi nhận hàng. Các yêu cầu giao hàng
              cần có thông tin chính xác về người nhận, địa chỉ, số điện thoại.
            </p>
            <p className="policy-p">
              - Một số trường hợp nhạy cảm như: giá trị đơn hàng lớn, thời gian
              giao hàng buổi tối, địa chỉ giao hàng trong ngõ, khu vực xa trung
              tâm... Nhân viên bán hàng sẽ kiểm tra và thoả thuận thêm, thống
              nhất cách thức giao hàng cụ thể.
            </p>

            <p className="policy-title">2. Thanh toán trực tuyến:</p>
            <p className="policy-p">
              NBH có thể chọn hình thức thanh toán trước 100% giá trị đơn hàng
              thông qua hình thức chuyển khoản vào tài khoản ngân hàng của Newee
              theo thông tin như sau:
            </p>

            <div className="col-lg-10 col-md-8 col-12 py-2 m-auto">
              <div className="row sp-card py-4 ">
                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                  <div className="col-left mr-2">
                    <img src={line} alt="Newee supports"></img>
                  </div>
                  <div className="col-right">
                    <span style={{ fontWeight: "200" }}>Tên tài khoản: </span>
                    ĐẶNG THỊ PHƯƠNG THẢO
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                  <div className="col-left mr-2">
                    <img src={line} alt="Newee supports"></img>
                  </div>
                  <div className="col-right">
                    <span style={{ fontWeight: "200" }}>Số tài khoản: </span>{" "}
                    0937 507 485{" "}
                  </div>
                </div>

                <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                  <div className="col-left mr-2">
                    <img src={line} alt="Newee supports"></img>
                  </div>
                  <div className="col-right">
                    <span style={{ fontWeight: "200" }}>Ngân hàng: </span> MB
                    Bank
                  </div>
                </div>
              </div>
            </div>

            <p className="policy-title">Lưu ý:</p>
            <p className="policy-p">
              Khi chọn hình thức này, Đối tác bán hàng cần thông báo cho Newee
              qua số Hotline hoặc ghi chú vào phần đơn hàng để Newee theo dõi
              được sát sao đơn hàng của bạn.
            </p>
            <p className="policy-p">
              Thời gian phản hồi: Phản hồi về việc tiếp nhận/yêu cầu bổ sung
              thông tin trong vòng từ 1 – 3 ngày.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
