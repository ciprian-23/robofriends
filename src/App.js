import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
// import { robots } from './Robots';
import './App.css';
import Scroll from './Scroll';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    };
  }

  componentDidMount() {
    // console.log('check');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  onSearchChange = (event) => {
    // console.log(event.target.value);
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    if (robots.length === 0) {
      return <h1>Loading robots...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f2">Robo Friends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
