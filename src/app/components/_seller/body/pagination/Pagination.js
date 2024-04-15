import React, { useState } from "react";
import './Pagination.scss';

function Pagination(props) {
  let { pagination, onPageChange, checkdisable } = props;
  console.log(pagination);
  const { _page, _limit, _totalRows } = pagination;
  //   console.log(_page);
  const totalPage = Math.ceil(_totalRows / _limit);
  //   console.log(totalPage);

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div id="pagination" className="pagination">
      <button
        className="btn btn-pagination prev"
        disabled={_page <= 1}
        onClick={() => handlePageChange(_page - 1)}
      >
        Prev
      </button>

      <button className="btn btn-pagination-number">1</button>
      <button className="btn btn-pagination-number">2</button>
      <button
        className="btn btn-pagination next"
        disabled={checkdisable ? checkdisable : null}
        onClick={() => handlePageChange(_page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
