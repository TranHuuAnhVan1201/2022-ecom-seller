import React from "react";
import "./Filter.scss";

import filter from "../../../../../../../newee/filter/filter.png"

function Filter(props) {
  return (
    <div className="filter">
      <h2>Sản Phẩm Bán Chạy</h2>
      <img
        className="img-right"
        src={
          filter
        }
        width={558}
        height={126}
        alt="newee"
      ></img>
    </div>
  );
}

export default Filter;
