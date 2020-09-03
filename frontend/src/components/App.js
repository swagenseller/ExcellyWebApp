import React, { Component } from "react";
import { render } from "react-dom";
import Table from "./Table";

//import 'bootstrap/dist/css/bootstrap.min.css';

const initRows = [
	{ name: "minichunks", brand: "Lambs", pet: "dogs", price: 3 },
	{
		name: "HE Thinks he is people",
		brand: "Archer",
		pet: "ocelots",
		price: 20,
	},
	{ name: "Wilderness", brand: "Blue Beef", pet: "dogs", price: 7 },
	{ name: "carrots", brand: "N/A", pet: "rabbits", price: 2 },
	{ name: "Shrimpy Shrimp", brand: "Venus", pet: "cats", price: 6 },
	{ name: "sea flakes", brand: "Krill", pet: "fish", price: 3 },
	{ name: "Furry Foodie", brand: "Venus", pet: "cast", price: 8 },
	{ name: "mice", brand: "PetCon", pet: "snakes", price: 2 },
	{ name: "crickets", brand: "Petcon", pet: "lizards", price: 3 },
	{ name: "crickets", brand: "Petcon", pet: "lizards", price: 3 },
	{ name: "crickets", brand: "Petcon", pet: "lizards", price: 3 },
	{ name: "crickets", brand: "Petcon", pet: "lizards", price: 3 },
	{ name: "crickets", brand: "Petcon", pet: "lizards", price: 3 },
];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: initRows,
		};
	}

	render() {
		//return (
		if (this.state.data.length < 1) {
			return (
				<ul>
					{this.state.data.map((food) => {
						return (
							<li key={food.id}>
								{food.name} - {food.brand} - {food.pet} - {food.price}
							</li>
						);
					})}
				</ul>
			);
		} else {
			return <Table data={this.state.data} />;
		}

		// );
	}
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
