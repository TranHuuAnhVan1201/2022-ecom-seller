import React from "react";
import { Link } from "react-router-dom";
import logoBCT from "./../../../../newee/bct/logoSaleNoti-bct.png";
import "./FooterHome.scss";

function FooterHome(props) {
  const links = [
    {
      id: 0,
      name: "facebook",
      url: "https://www.facebook.com/newee.social",
      links:
        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739064/newee/newee%200604/s9fiy6660kbyd4sywwg7.png",
    },
    {
      id: 1,
      name: "youtube",
      url: "https://www.youtube.com/channel/UCBXO3aEBAhRZJucrNikEZ3w",
      links:
        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739064/newee/newee%200604/si0yxjqcf5pw8glnzonh.png",
    },
    {
      id: 2,
      name: "zalo",
      url: "https://www.facebook.com/newee.social",
      links:
        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739064/newee/newee%200604/jgescdp8kmp87tw6svio.png",
    },
    {
      id: 3,
      name: "tiktok",
      url: "https://www.tiktok.com/@newee_social",
      links:
        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1618908876/newee/seller/vcvflpptnucczu8vwiy0.png",
    },
  ];

  const onClickFooterConnect = (id) => {
    window.open(`${links[id].url}`);
  };

  return (
    <footer>
      <div className="footer-headers">
        <section>
          <div className="footer-header">
            <div className="col-5">
              <h2>Hỗ trợ khách hàng</h2>
              <h3 style={{ color: "#bf081f" }}>Hotline 033 745 6729</h3>
              <ul>
                {/* <li>Các câu hỏi thường gặp</li> */}
                {/* <li>Hướng dẫn đặt hàng</li> */}
                {/* <li>Phương thức vận chuyển</li> */}
                {/* <li>Hỗ trợ khách hàng</li> */}
                <li>Seller@newee.asia</li>
              </ul>

              <h2>Bán Hàng Cùng NEWEE</h2>

              <ul>
                {/* <li>
                  <Link to="/supports/ban-hang-cung-newee">
                    Đăng ký trở thành nhà bán hàng
                  </Link>
                </li> */}
                <li>
                  <Link to="/supports/question">Các câu hỏi thường gặp</Link>
                </li>
                <li>
                  <Link to="/supports/tutorial">Hướng dẫn đặt hàng</Link>
                </li>
                <li>
                  <Link to="/supports/regulation">Quy chế hoạt động</Link>
                </li>
              </ul>
            </div>

            <div className="col-5">
              <h2>Về chúng tôi</h2>

              <ul>
                <li>
                  <Link to="/supports/about">Giới thiệu</Link>
                </li>
                {/* <li>
                  <Link to="/supports/tuyen-dung">Tuyển dụng</Link>
                </li> */}
                <li>
                  <Link to="/supports/policys">
                    Chính sách bảo mật thông tin cá nhân
                  </Link>
                </li>
                <li>
                  <Link to="/supports/report">
                    Quy trình đổi trả và xử lý khiếu nại
                  </Link>
                </li>
                <li>
                  <Link to="/supports/shipping">
                    Cách thức vận chuyển và thanh toán
                  </Link>
                </li>
                <li>
                  <Link to="/supports/quaranty-policy">
                    Chính sách bảo hành
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-5 pay">
              <h2>Phương thức thanh toán</h2>
              <ul>
                {/* <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737246/newee/newee%200604/b4r2oyzl3mour8cionvv.png"
                  }
                  alt="Newee"
                ></img>
                <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737245/newee/newee%200604/x22kvnklsjctwvj77mha.png"
                  }
                  alt="Newee"
                ></img>
                <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737245/newee/newee%200604/pohiaxepk1wsxi7n5sey.png"
                  }
                  alt="Newee"
                ></img> */}
                <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737464/newee/newee%200604/icfsuqnedw3a6h7njcej.png"
                  }
                  alt="Newee"
                ></img>

                <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737464/newee/newee%200604/s4zoxm31w1o69dkneopx.png"
                  }
                  alt="Newee"
                ></img>
              </ul>
            </div>
            {/* <div className="col-5 trans">
              <h2>Đơn vị vận chuyển</h2>

              <ul>
                <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737245/newee/newee%200604/ajkjreau0ijg99oxky0c.png"
                  }
                  alt="Newee"
                ></img>
              </ul>
            </div> */}
            <div className="col-5 pay">
              <h2>Kết nối với chúng tôi</h2>
              <ul className="last-child .d-flex-column-flex-star">
                {links.map((value, key) => {
                  return (
                    <div
                      onClick={() => onClickFooterConnect(value.id)}
                      key={key}
                      className="social-icon"
                    >
                      <img src={value.links} alt="icon-footer-newee"></img>
                    </div>
                  );
                })}
              </ul>
              {/* <h2 className="mt-32">TẢI ỨNG DỤNG NEWEE</h2>
              <ul className="last-child">
                <li className="d-flex-column-flex-star">
                  <img
                    src={
                      "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739636/newee/newee%200604/akochp11cyl1s8yvu4kv.png"
                    }
                    alt="Newee"
                  ></img>
                  <span>App Store</span>
                </li>

                <li className="d-flex-column-flex-star">
                  <img
                    src={
                      "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739636/newee/newee%200604/zua6mpdagwzuttkkc9xt.png"
                    }
                    alt="Newee"
                  ></img>
                  <span>Google Play</span>
                </li>
              </ul> */}
            </div>
          </div>
        </section>

        <div className="footer-body">
          <section className="footer-body">
            <div className="group-copyright">
              <a
                href="http://online.gov.vn/Home/WebDetails/83593"
                target="_blank"
                rel="noreferrer"
              >
                <img src={logoBCT} alt="Newee bộ công thương" />
              </a>

              {/* <img
                src={
                  "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617737245/newee/newee%200604/xjur3906vph2pjymglvi.png"
                }
                alt="Newee"
              ></img> */}
            </div>

            <div className="footer-address">
              <span>
                Địa chỉ văn phòng: 438 Nơ Trang Long, Phường 13, Quận Bình
                Thạnh, Thành phố Hồ Chí Minh.
              </span>
            </div>
            <div className="newee">
              <img
                src={
                  "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617771340/newee/ugwdhqgf5ze36mphqwra.png"
                }
                alt="Newee"
              ></img>
              <span className="span-newee">@NEWEE 2021</span>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default FooterHome;
