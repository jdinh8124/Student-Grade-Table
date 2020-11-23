import React, { useEffect } from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';

const App = props => {
  const [grades, setGrades] = React.useState([]);
  const [objToPass, setObjToPass] = React.useState(null);
  const [signedIn] = React.useState(true);

  const getNames = () => {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setGrades(myJson);
      })
      .catch(reason => {
        console.error(reason.message);
      });
  };

  const addNames = (student, changes) => {
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
          const newArray = [...grades];
          newArray.push(myJson);
          setGrades(newArray);
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
          const newArray = [...grades];
          const indexMatch = newArray.findIndex(object => object.gradeId === student.gradeId);
          newArray[indexMatch] = myJson[0];
          setGrades(newArray);
        })
        .catch(reason => {
          console.error(reason.message);
        });
    }
  };

  const deleteNames = gradeId => {
    fetch(`/api/grades/${gradeId}`, {
      method: 'DELETE'
    })
      .then(response => {
        const newArray = [...grades];
        const indexMatch = newArray.findIndex(object => object.gradeId === gradeId);
        newArray.splice(indexMatch, 1);
        setGrades(newArray);
      })
      .catch(reason => {
        console.error(reason.message);
      });
  };

  const updateNames = gradeId => {
    const foundObj = grades.find(object => object.gradeId === gradeId);

    if (foundObj) {
      setObjToPass(foundObj);
    }
  };

  const getAverageGrade = () => {
    const arrayOfGrades = grades.map(studentGrades => {
      return studentGrades.grade;
    });
    if (arrayOfGrades.length > 0) {
      return Math.round(arrayOfGrades.reduce((a, b) => a + b, 0) / arrayOfGrades.length);
    } else {
      return 'N/A';
    }
  };

  const isFirstUpdate = React.useRef(true);
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      getNames();
    }
  }
  );

  // componentDidMount() {
  // }

  const isUserSignedIn = () => {
    if (signedIn) {
      const average = getAverageGrade();
      return (
        <div className="m-md-5 m-1 container-fluid ">
          <Header text="Student Grade Table" grade={average} />
          <div className="row container-fluid justify-content-center ">
            <GradeTable grades={grades} remove={deleteNames} update={updateNames} />
            <GradeForm submit={addNames} foundObj={objToPass} />
          </div>
        </div>
      );
    }
  };
  return isUserSignedIn();
};

export default App;
