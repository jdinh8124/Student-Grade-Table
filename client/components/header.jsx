import React from 'react';

export default function Header(props) {
  return (
    <div className="row container-fluid  justify-content-center text-center mb-sm-4 mb-xs-4 ">
      <div className="col-xl-4 col-lg-9">
        <div className="h1 titleFont">{props.text}</div>
      </div>
      <div className="col-xl-3 offset-xl-5 col-lg-6 container-fluid   ">
        <div className="h2 d-inline fontInBetween">Average Grade </div>
        <div className=" fontInBetween h2 d-inline bg-secondary text-white p-1 border border-2 rounded">{props.grade}</div>
      </div>
    </div>

  );
}
