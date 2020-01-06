import React from 'react';
import Grade from './grade';

export default function GradeTable(props) {
  const elements = props.grades.map(student => {
    return <Grade name={student.name} course={student.course} grade={student.grade} key={student.id}/>;
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Course</th>
          <th scope="col">Grade</th>
        </tr>
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  );
}
