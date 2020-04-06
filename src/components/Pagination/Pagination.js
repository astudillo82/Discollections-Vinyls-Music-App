import React from 'react';


const Pagination = ({ nextPage, page, prevPage }) => {
  return (
    <div>
      <button type="button" className="next-page" onClick={nextPage}>NEXT</button>
      <p className="number-page">
        CURRENT PAGE :
        { page }
      </p>
      <button type="button" className="next-page" onClick={prevPage}>PREV</button>
    </div>
  );
};

export default Pagination;
