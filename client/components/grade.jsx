import React from 'react';

export default function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td><button onClick={() => { props.buttonClick(props.id); }}className="btn btn-danger">Delete</button>
        <button onClick={() => { props.updateClick(props.id); }} className="btn btn-info ml-2">Update</button>
      </td>
    </tr>
  );
}
