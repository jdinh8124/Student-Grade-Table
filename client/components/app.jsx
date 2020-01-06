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

  componentDidMount() {
    this.getNames();
  }

  render() {
    return (
      <div className="m-4">
        <Header text="Student Grade Table" />,
        <GradeTable grades={this.state.grades} />
      </div>
    );
  }
}

export default App;
