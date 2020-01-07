import React from 'react';
import Grade from './grade';

export default function GradeTable(props) {
  let elements;
  if (props.grades.length > 0) {
    elements = <tr><td><div className="h2">No Grades Were Record</div></td></tr>;
  } else {
    elements = props.grades.map(student => {
      return <Grade name={student.name} course={student.course} grade={student.grade} key={student.id} id={student.id} buttonClick={props.remove}/>;
    });
  }
  return (
    <table className="table table-striped w-75">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Course</th>
          <th scope="col">Grade</th>
          <th scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  );
}
