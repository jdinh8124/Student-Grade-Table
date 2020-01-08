import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      objToPass: null
    };
    this.deleteNames = this.deleteNames.bind(this);
    this.updateNames = this.updateNames.bind(this);
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

  addNames(student, changes) {
    if (!changes || changes === undefined) {
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
          this.setState(previousState => ({
            grades: newArray
          }));
        })
        .catch(reason => {
          console.error(reason.message);
        });
    } else {
      fetch(`/api/grades/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(student)
      })
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          const newArray = [...this.state.grades];
          const indexMatch = newArray.findIndex(object => object.id === student.id);
          newArray[indexMatch] = myJson;
          this.setState(previousState => ({
            grades: newArray
          }));
        })
        .catch(reason => {
          console.error(reason.message);
        });
    }
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

  updateNames(id) {
    const foundObj = this.state.grades.find(object => object.id === id);
    this.setState({ objToPass: foundObj });
  }

  // fetch(`/api/grades/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8'
  //   },
  //   body: JSON.stringify(id)
  // })
  //     .then(response => {
  //   return response.json();
  // })
  // .then(myJson => {
  //   const newArray = [...this.state.grades];
  //   newArray.push(myJson);
  //   const indexMatch = newArray.findIndex(object => object.id === id);
  //   newArray[indexMatch] = myJson;
  //   this.setState(previousState => ({
  //     grades: newArray
  //   }));
  // })
  // .catch(reason => {
  //   console.error(reason.message);
  // });

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

  render() {
    const average = this.getAverageGrade();
    return (
      <div className="m-4 container-fluid  ">
        <Header text="Student Grade Table" grade={average}/>
        <div className=" row container-fluid justify-content-center ">
          <GradeTable grades={this.state.grades} remove={this.deleteNames} update={this.updateNames} />
          <GradeForm submit={this.addNames} foundObj={this.state.objToPass}/>
        </div>
      </div>
    );
  }
}

export default App;
