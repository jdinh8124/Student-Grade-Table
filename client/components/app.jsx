import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };

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
        <GradeTable grades={this.state.grades} />
      </div>
    );
  }
}

export default App;
