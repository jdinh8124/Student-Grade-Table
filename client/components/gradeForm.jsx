import React, { useEffect } from 'react';

const GradeForm = props => {
  const [name, changeName] = React.useState('');
  const [course, changeCourse] = React.useState('');
  const [grade, changeGrade] = React.useState('');
  const [gradeId, changeGradeId] = React.useState('');
  const [update, setUpdateState] = React.useState(false);

  const isFirstUpdate = React.useRef(true);
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    }

    const propName = props.foundObj.name;
    const propCourse = props.foundObj.course;
    const propGrade = props.foundObj.grade;
    const propGradeId = props.foundObj.gradeId;

    changeName(propName);
    changeCourse(propCourse);
    changeGrade(propGrade);
    changeGradeId(propGradeId);
    setUpdateState(true);
  }, [props.foundObj]
  );

  const handleNameChange = newName => {
    changeName(newName.target.value);
  };

  const handleCourseChange = newCourse => {
    changeCourse(newCourse.target.value);
  };

  const handleGradeChange = newGrade => {
    changeGrade(newGrade.target.value);
  };

  const submitStudent = submitEvent => {
    submitEvent.preventDefault();
    if (name === '' || course === '' || grade === '' || !parseFloat(grade)) {
      return;
    }
    if (update) {
      const objectToSubmit = {
        name: name,
        course: course,
        grade: parseInt(grade),
        gradeId: gradeId
      };
      props.submit(objectToSubmit, update);
      clearState();
    } else {
      const objectToSubmit = {
        name: name,
        course: course,
        grade: parseInt(grade)
      };
      props.submit(objectToSubmit, false);
      clearState();
    }

  };

  const clearState = () => {
    changeName('');
    changeCourse('');
    changeGrade('');
    setUpdateState(false);
  };

  const buttonToRender = () => {
    return update ? <button className="btn btn-outline-primary ml-2" type="submit">Update</button> : <button className="btn btn-success ml-2" type="submit">Submit</button>;
  };

  const buttonToChange = buttonToRender();
  return (
    <form className="ml-xl-5 ml-lg-5" onSubmit={submitStudent} onReset={clearState}>
      <div>
        <div className="input-group mb-3 ">
          <div className="input-group-prepend">
            <span className="input-group-text" ><i className="fas fa-user icon"></i></span>
            <input type="text" className="border-2 form-control" onChange={handleNameChange} placeholder="Name" value={name}/>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" ><i className="far fa-list-alt icon"></i></span>
            <input type="text" className="border-2 form-control" onChange={handleCourseChange} placeholder="Course" value={course} />
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" ><i className="fas fa-graduation-cap icon"></i></span>
            <input type="text" className="border-2 form-control" onChange={handleGradeChange} placeholder="Grade" value={grade} />
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {buttonToChange}
        <button className="btn btn-secondary  ml-2" type="reset">Reset</button>
      </div>
    </form>
  );
};

export default GradeForm;
