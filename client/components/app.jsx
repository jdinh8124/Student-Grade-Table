import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      objToPass: null,
      signedIn: true
    };
    this.addNames = this.addNames.bind(this);
    this.deleteNames = this.deleteNames.bind(this);
    this.updateNames = this.updateNames.bind(this);
  }

  getNames() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          grades: myJson
        });
      })
      .catch(reason => {
        console.error(reason.message);
      });
  }

  addNames(student, changes) {
    if (!changes) {
      fetch('/api/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      })
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          const newArray = [...this.state.grades];
          newArray.push(myJson);
          this.setState({
            grades: newArray
          });
        })
        .catch(reason => {
          console.error(reason.message);
        });
    } else {
      fetch(`/api/grades/${student.gradeId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(student)
      })
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          const newArray = [...this.state.grades];
          const indexMatch = newArray.findIndex(object => object.gradeId === student.gradeId);
          newArray[indexMatch] = myJson[0];
          this.setState(({
            grades: newArray
          }));
        })
        .catch(reason => {
          console.error(reason.message);
        });
    }
  }

  deleteNames(gradeId) {
    fetch(`/api/grades/${gradeId}`, {
      method: 'DELETE'
    })
      .then(response => {
        const newArray = [...this.state.grades];
        const indexMatch = newArray.findIndex(object => object.gradeId === gradeId);
        newArray.splice(indexMatch, 1);
        this.setState(previousState => ({
          grades: newArray
        }));
      })
      .catch(reason => {
        console.error(reason.message);
      });
  }

  updateNames(gradeId) {
    const foundObj = this.state.grades.find(object => object.gradeId === gradeId);
    this.setState({
      objToPass: foundObj
    });
  }

  getAverageGrade() {
    const arrayOfGrades = this.state.grades.map(studentGrades => {
      return studentGrades.grade;
    });
    if (arrayOfGrades.length > 0) {
      return Math.round(arrayOfGrades.reduce((a, b) => a + b, 0) / arrayOfGrades.length);
    } else {
      return 'N/A';
    }
  }

  componentDidMount() {
    this.getNames();
  }

  isUserSignedIn() {
    if (this.state.signedIn) {
      const average = this.getAverageGrade();
      return (
        <div className="m-md-5 m-1 container-fluid ">
          <Header text="Student Grade Table" grade={average} />
          <div className=" row container-fluid justify-content-center ">
            <GradeTable grades={this.state.grades} remove={this.deleteNames} update={this.updateNames} />
            <GradeForm submit={this.addNames} foundObj={this.state.objToPass} />
          </div>
        </div>
      );
    }
  }

  render() {
    return this.isUserSignedIn();
  }
}

export default App;
