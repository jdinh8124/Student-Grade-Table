import React from 'react';

const Header = props => {
  return (
    <div className="row container-fluid  justify-content-center text-center mb-4 pb-3 ">
      <div className="col-xl-4 col-lg-9">
        <div className="h1 titleFont">{props.text}</div>
      </div>
      <div className="ml-xl-auto">
        <div className="h2 d-inline fontInBetween pr-1">Average Grade</div>
        <span className="badge d-inline fontInBetween border-2 rounded badge-secondary">{props.grade}</span>
      </div>
    </div>
  );
};

export default Header;
