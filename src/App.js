import React, { Component } from 'react';
import cssClasses from './App.css';
import Person from './Person/Person';
import Char from './Char/Char';
import Validation from './Validation/Validation';

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    userInput: ''
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  lengthHandler = event => {
    this.setState({ userInput: event.target.value });
  };

  deleteCharHandler = index => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({ userInput: updatedText });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    // was substituted with a more modern approach.
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const charList = this.state.userInput.split('').map((ch, index) => {
      return (
        <Char
          character={ch}
          key={index}
          clicked={() => this.deleteCharHandler(index)}
        />
      );
    });

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={event => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      btnClass = cssClasses.Red;
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push( cssClasses.red );
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push( cssClasses.bold );
    }

    return (
        <div className={cssClasses.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <div className="Person">
            <input
              type="text"
              name="userInput"
              onChange={this.lengthHandler}
              value={this.state.userInput}
            />
            <p>{this.state.userInput}</p>
            <Validation inputLength={this.state.userInput.length} />
            {charList}
          </div>
          <button className={btnClass} onClick={this.togglePersonsHandler}>
            Toggle Persons
        </button>
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
