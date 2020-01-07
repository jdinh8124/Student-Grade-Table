import React from 'react';

export default function Header(props) {
  return (
    <div className="row container-fluid">
      <div className="col-md-9">
        <h1>{props.text}</h1>
      </div>
      <div className="col-md-3">
        <h2 className="d-inline">Average Grade </h2>
        <h2 className="d-inline bg-secondary text-white p-1 border border-2 rounded">{props.grade}</h2>
      </div>
    </div>

  );
}
