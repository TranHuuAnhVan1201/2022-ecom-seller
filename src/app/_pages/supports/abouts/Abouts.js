import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Abouts.scss";
import btnClose from "../../../../newee/button/times-solid.svg";



function Abouts(props) {
  const [check, setCheck] = useState(false);
  const handleClick = () => {
    setCheck(!check);
  }


  return (
    <div className="container-fluid">
      <div className="abouts-intro">
        <h2 className="about-main-title">
          NEWEE <br />
          SELLER NETWORK
        </h2>
        <p className="intro-p-center">
          Newee là hệ thống liên kết các nhà bán hàng cá nhân trên khắp cả nước,
          được ra đời với sứ mệnh giúp đa dạng hóa kênh phân phối cho doanh
          nghiệp thông qua hoạt động thương mại trên các kênh TMĐT & Mạng xã
          hội.
        </p>

       

        <div>
          <button className="btn btn-primary my-2 my-sm-0 px-4 btn-register ml-2" id="btn-play-video" type="button" onClick={() => handleClick()}>
            <span style={{ fontSize: '1rem', textTransform: 'uppercase', paddingRight: '26px', paddingLeft: '26px' }}>Khám Phá Newee</span>
          </button>
          <div className={check ? "video-popup open" : "video-popup"}>
            <div className="video-popup-inner">
              <div className="video-popup-close" onClick={() => handleClick()}>
                <img className="video-popup-img" width="24px" height="24px" src={btnClose} alt="Newee btn-cancel-video" />
              </div>
              <div className="iframe-box" >
                <iframe id="player-1" src="https://www.youtube.com/embed/FZanqvWNqu8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>





      </div>





    </div>
  );
}

export default Abouts;
