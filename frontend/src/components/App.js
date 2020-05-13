import React, { Component } from "react";
import { render } from "react-dom";
import Table from './Table';

//import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",

    }
  }
  // requests the data from our database and sets the state to an object with it and 
  // a property loaded = true
  componentDidMount() {
    fetch("api/petfood")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
     

  }

  render() {
    //return (
      if (this.state.data.length < 1) {
        return (
          <ul>
            {this.state.data.map(food => {
              return (
                <li key={food.id}>
                  {food.name} - {food.brand} - {food.pet} - {food.price}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <Table data={this.state.data} />
        );
      }
      
   // );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

