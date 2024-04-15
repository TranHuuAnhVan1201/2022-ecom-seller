import React from "react";
import "../_scss/Support.scss";

import logo from "../../../../newee/supports/qa.png";

export default function Index() {
  return (
    <div className="sp-container-fluid">
      <section id="policy" className="py-lg-5 py-4">
        <div className="container">
          <div className="col-lg-10 col-12 text-left m-auto sp-header">
            <span className="hero px-md-4 px-2">CHÍNH SÁCH BẢO MẬT</span>

            <img height={90} width={90} src={logo} alt="Newee support"></img>
          </div>
          <div className="col-lg-8  col-md-10 col-12 m-auto py-lg-4 py-2 text-justify">
            <p className="policy-title">1. Mục đích và phạm vi thu thập</p>
            <p className="policy-p">
              {" "}
              Cảm ơn Bạn đã truy cập vào website của chúng tôi, để sử dụng dịch
              vụ tại website, Bạn có thể được yêu cầu đăng ký thông tin cá nhân
              với chúng tôi như:
            </p>
            <p className="policy-p"> - Họ và tên, địa chỉ liên lạc</p>
            <p className="policy-p"> - Email, số điện thoại di dộng</p>
            <p className="policy-p">- Số tài khoản ngân hàng</p>
            <p className="policy-p">
              - Ảnh chụp CMND Chúng tôi cũng có thể thu thập thông tin về số lần
              viếng thăm website của chúng tôi bao gồm số trang Bạn xem, số mục
              Bạn click và các thông tin khác liên quan đến việc kết nối đến địa
              chỉ newee.asia
            </p>

            <p className="policy-title"> 2. Phạm vi sử dụng thông tin</p>
            <p className="policy-p">
              {" "}
              Newee thu thập và sử dụng thông tin cá nhân với mục đích phù hợp
              và hoàn toàn tuân thủ “chính sách bảo mật” này. Chúng tôi chỉ sử
              dụng thông tin của Bạn trong nội bộ công ty hoặc có thể công bố
              cho bên thứ 3 như các đại lý, các nhà cung cấp dịch vụ khác nhằm
              đem đến cho Bạn dịch vụ tối ưu nhất.
            </p>
            <p className="policy-p">
              {" "}
              Khi cần thiết chúng tôi có thể sử dụng những thông tin này để liên
              hệ trực tiếp với Bạn như gửi thư ngỏ, đơn đặt hàng, thư cảm ơn,
              thông tin về kỹ thuật và bảo mật, thông tin về khuyến mãi, sản
              phẩm dịch vụ mới...
            </p>

            <p className="policy-title">3. Thời gian lưu trữ thông tin</p>
            <p className="policy-p">
              {" "}
              Các thông tin của Bạn hàng sẽ được lưu trữ trong hệ thống nội bộ
              của công ty chúng tôi cho đến khi Bạn có yêu cầu hủy bỏ các thông
              tin đã cung cấp.
            </p>

            <p className="policy-title">
              {" "}
              4. Địa chỉ của đơn vị thụ thập và quản lý thông tin cá nhân
            </p>
            <p className="policy-p"> CÔNG TY TNHH TIẾP THỊ SÁNG TẠO ĐIỂM</p>
            <p className="policy-p">
              {" "}
              Địa chỉ: 438 Nơ Trang Long, Phường 13, Quận Bình Thạnh, Thành phố
              Hồ Chí Minh.
            </p>
            <p className="policy-p"> Điện thoại:</p>

            <p className="policy-title ">
              {" "}
              5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ
              liệu cá nhân
            </p>

            <p className="policy-p">
              {" "}
              Bạn muốn chỉnh sửa thông tin cá nhân của mình vui lòng liên hệ
              tổng đài chăm sóc khách hàng của chúng tôi qua số điện thoại: 0337
              456 729 hoặc qua địa chỉ email: SELLER@NEWEE.ASIA
            </p>
            <p className="policy-p">
              * Cam kết bảo mật thông tin cá nhân khách hàng
            </p>

            <p className="policy-p">
              Chúng tôi cam kết bảo mật thông tin của Bạn bằng mọi hình thức có
              thể như chính bảo vệ thông tin cá nhân của chúng tôi. Chúng tôi
              tuyệt đối không chia sẻ thông tin của Bạn cho bất cứ công ty hay
              bên thứ 3 nào khác.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
