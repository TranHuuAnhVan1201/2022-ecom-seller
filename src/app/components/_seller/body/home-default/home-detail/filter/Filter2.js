import React from "react";
import "./Filter.scss";

import filter from "../../../../../../../newee/filter/filter.png"
function Filter2(props) {
  return (
    <div className="filter">
      <h2>Sản Phẩm Chiết Khấu Cao</h2>
      <img
        className="img-right"
        src={
          filter
        }
        width={558}
        height={126}
        alt="Newee"
      ></img>
    </div>
  );
}

export default Filter2;
