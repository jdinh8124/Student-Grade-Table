import React from 'react';
import Grade from './grade';

const GradeTable = props => {
  const elements = props.grades.map(student => {
    return <Grade name={student.name} course={student.course} grade={student.grade} key={student.gradeId} gradeId={student.gradeId} buttonClick={props.remove} updateClick={props.update}/>;
  });
  return (
    <table className="table table-striped col mr-3 mr-md-0">
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
};

export default GradeTable;
