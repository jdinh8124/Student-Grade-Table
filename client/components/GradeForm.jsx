import React from 'react';

export default class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.submitStudent = this.submitStudent.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCourseChange(event) {
    this.setState({ course: event.target.value });
  }

  handleGradeChange(event) {
    this.setState({ grade: event.target.value });
  }

  submitStudent() {
    if (this.state.name === '' || this.state.course === '' || this.state.grade === '') {
      return;
    }
    const objectToSubmit = {
      name: this.state.name,
      course: this.state.course,
      grade: parseInt(this.state.grade)
    };
    this.props.submit(objectToSubmit);
    this.setState(previousState => ({ name: '', course: '', grade: '' }));
    document.getElementById('entireForm').reset();
  }

  resetForm() {
    this.setState(previousState => ({ name: '', course: '', grade: '' }));
    document.getElementById('entireForm').reset();
  }

  render() {
    return (
      <form className="ml-5">
        <div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" ><i className="fas fa-user "></i></span>
            </div>
            <input type="name" className="border-2" onChange={this.handleNameChange} placeholder="Name" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
            <span className="input-group-text" ><i className="far fa-list-alt"></i></span>
            <input type="name" className="border-2" onChange={this.handleCourseChange} placeholder="Course" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" ><i className="fas fa-graduation-cap"></i>
              </span>
              <input type="name" className="border-2" onChange={this.handleGradeChange} placeholder="Grade" />
            </div>
          </div>
        </div>
        <button className="btn btn-success ml-2" onClick={this.submitStudent}>Submit</button>
        <button className="btn btn-secondary  ml-2" onClick={this.resetForm}>Reset</button>
      </form>
    );
  }
}
