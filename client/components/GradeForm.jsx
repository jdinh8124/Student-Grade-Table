import React from 'react';

export default class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: '',
      id: null,
      update: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.submitStudent = this.submitStudent.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.foundObj !== prevProps.foundObj) {
      const name = this.props.foundObj.name;
      const course = this.props.foundObj.course;
      const grade = this.props.foundObj.grade;
      const id = this.props.foundObj.id;
      this.setState({
        name: name,
        course: course,
        grade: grade,
        id,
        update: true
      });
    }
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

  submitStudent(event) {
    if (this.state.name === '' || this.state.course === '' || this.state.grade === '') {
      return;
    }
    if (this.state.update) {
      const objectToSubmit = {
        name: this.state.name,
        course: this.state.course,
        grade: parseInt(this.state.grade),
        id: this.state.id
      };
      this.props.submit(objectToSubmit, this.state.update);
      this.setState(previousState => ({ name: '', course: '', grade: '', update: false }));
    } else {
      const objectToSubmit = {
        name: this.state.name,
        course: this.state.course,
        grade: parseInt(this.state.grade)
      };
      this.props.submit(objectToSubmit, false);
      this.setState(previousState => ({ name: '', course: '', grade: '', update: false }));
    }

  }

  resetForm(event) {
    this.setState(previousState => ({ name: '', course: '', grade: '', update: false }));
  }

  buttonToRender() {
    return this.state.update ? <button className="btn btn-outline-primary ml-2" type="submit">Update</button> : <button className="btn btn-success ml-2" type="submit">Submit</button>;
  }

  render() {
    const buttonToChange = this.buttonToRender();
    return (
      <form className="ml-xl-5 ml-lg-5" onSubmit={this.submitStudent} onReset={this.resetForm}>
        <div>
          <div className="input-group mb-3 ">
            <div className="input-group-prepend">
              <span className="input-group-text" ><i className="fas fa-user "></i></span>
            </div>
            <input type="text" className="border-2 form-control" onChange={this.handleNameChange} placeholder="Name" value={this.state.name}/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
            <span className="input-group-text" ><i className="far fa-list-alt"></i></span>
            <input type="text" className="border-2 form-control" onChange={this.handleCourseChange} placeholder="Course" value={this.state.course} />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" ><i className="fas fa-graduation-cap"></i>
              </span>
              <input type="text" className="border-2 form-control" onChange={this.handleGradeChange} placeholder="Grade" value={this.state.grade} />
            </div>
          </div>
        </div>
        {buttonToChange}
        <button className="btn btn-secondary  ml-2" type="reset">Reset</button>
      </form>
    );
  }
}
