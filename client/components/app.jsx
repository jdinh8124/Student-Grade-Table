import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.deleteNames = this.deleteNames.bind(this);
  }

  getNames() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState(previousState => ({
          grades: myJson
        }));
      })
      .catch(reason => {
        console.error(reason.message);
      });
  }

  addNames(newStudent) {
    fetch('/api/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        const newArray = [...this.state.grades];
        newArray.push(myJson);
        this.setState(previousState => ({
          grades: newArray
        }));
      })
      .catch(reason => {
        console.error(reason.message);
      });
  }

  deleteNames(id) {
    fetch(`/api/grades/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        const newArray = [...this.state.grades];
        const indexMatch = newArray.findIndex(object => object.id === id);
        newArray.splice(indexMatch, 1);
        this.setState(previousState => ({
          grades: newArray
        }));
      })
      .catch(reason => {
        console.error(reason.message);
      });
  }

  getAverageGrade() {
    const arrayOfGrades = this.state.grades.map(studentGrades => {
      return studentGrades.grade;
    });
    if (arrayOfGrades.length > 0) {
      return Math.round(arrayOfGrades.reduce((a, b) => a + b, 0) / arrayOfGrades.length);
    } else {
      return 0;
    }
  }

  componentDidMount() {
    this.getNames();
  }

  render() {
    const average = this.getAverageGrade();
    return (
      <div className="m-4">
        <Header text="Student Grade Table" grade={average}/>
        <div className="d-flex">
          <GradeTable grades={this.state.grades} remove={this.deleteNames} />
          <GradeForm submit={this.addNames} />
        </div>
      </div>
    );
  }
}

export default App;
