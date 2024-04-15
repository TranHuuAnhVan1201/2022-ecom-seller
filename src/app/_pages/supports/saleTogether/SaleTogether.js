import React from "react";
import Slider from "react-slick";
import "./SaleTogether.scss";

function SaleTogether(props) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "150px",
    centermargin: "50px",
    initialSlide: 3,
    slidesToScroll: 1,

    slidesToShow: 1,
    speed: 500,
  };
  return (
    <div className="sale-together">
      <section>
        <div className="banner">
          <Slider {...settings}>
            <div clsasName="sale-together-img" style={{ margin: "0 20px;" }}>
              <img src={"http://placehold.jp/940x605.png"} alt="Newee"></img>
            </div>
            <div clsasName="sale-together-img">
              <img src={"http://placehold.jp/940x605.png"} alt="Newee"></img>
            </div>
            <div>
              <img src={"http://placehold.jp/940x605.png"} alt="Newee"></img>
            </div>
            <div>
              <img src={"http://placehold.jp/940x605.png"} alt="Newee"></img>
            </div>
            
          </Slider>
        </div>
      </section>

      {/* <div className="img-fluid">
        <Link to="/supports/ban-hang-cung-newee/dang-ky">
          <img
            src={
              "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617872505/newee/seller/supports/jztphlqr5jvbedm2njec.png"
            }
            alt="Newee"
          ></img>
        </Link>
      </div> */}
      <div className="img-fluid">
        <img src={"http://placehold.jp/1240x923.png"} alt="Newee"></img>
      </div>
    </div>
  );
}

export default SaleTogether;
