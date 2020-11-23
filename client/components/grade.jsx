import React from 'react';

const Grade = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td className="d-flex flex-column flex-md-row"><button onClick={() => { props.buttonClick(props.gradeId); }}className="btn btn-danger">Delete</button>
        <button onClick={() => { props.updateClick(props.gradeId); }} className="btn btn-info mt-2 mt-md-0">Update</button>
      </td>
    </tr>
  );
};

export default Grade;
