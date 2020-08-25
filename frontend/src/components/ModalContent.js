import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Table } from 'react-bootstrap';
import Footer from './Footer';
import ModBody from './ModBody';
import axios from 'axios';

// will need to refactor this
class ModalContent extends Component {
	constructor(props){
		super(props);
		//this.setTitle = this.setTitle.bind(this);
		this.state = {
			title: '',
			message: '',
			selectRow: this.props.selectRow
	
		}
		this.handleChange = this.handleChange.bind(this);

	}

	componentDidMount(){
		this.setTitle();
	}

	handleChange(event){ 
		const {selectRow} = {...this.state};
		const currentState = selectRow;
		const {name, value} = event.target;
		currentState[name] = value;
		this.setState({selectRow: currentState});
	}
	
	// sets the state for Modal depending on whether the user clicked 
	// edit or delete button
	setTitle(){
		if(this.props.title === "edit") {
			this.setState({
				title: "Edit Row",
				message: null,
			});
		} else if (this.props.title === "delete"){
			this.setState({
				title: "Delete Row", 
				message: "Are you sure you want to delete this row?",
			});
		} else if (this.props.title === "add"){
			this.setState({
				title: "Add Row", 
				message: null,
			});
		}
	}
	
	onClose = () =>{
		this.props.onResponse();
	}

	delete = () =>{
		const data = this.props.selectRow.id //{ id: this.props.selectRow.id };
		const url = '' + data + '/delete/';
		axios.delete(url, {removed: this.props.selectRow})
			.then( (response) => {
				this.props.onDelete(); 
			});
	
	}

	// tells parent App.js to edit the row
	// refactor to enter send a request when promise is successful
	edit = () => {
		const data = this.props.selectRow.id //{ id: this.props.selectRow.id };
		const url = '' + data + '/put/';
		axios.put(url, this.state.selectRow)
			.then( (response) => {
				this.props.onEdit(response.data)
			})
			.catch(function (error) { // refactor to tell user what is wrong
				console.log(error);
			})

	}

	add = () => {
		const url = 'add/';
		axios.post(url, this.state.selectRow)
			.then( (response) => {
				this.props.onAdd(response.data);
			})
			.catch(function (error) { // refactor to tell user what is wrong
				console.log(error);
			});
	}

	render() {
		return ReactDOM.createPortal(
			<aside>
				<Modal
					show={this.props.isOpen}
					onHide={this.onClose}
				>
					<Modal.Header variant="danger" closeButton onClick={this.onClose}>
						<Modal.Title>{this.state.title}</Modal.Title>
					</Modal.Header>

					<ModBody
						title={this.props.title}
						selectRow={this.state.selectRow}
						handleChange={this.handleChange}
						message={this.state.message}
					/>

					<Footer 
						onClose={this.onClose} 
						edit={this.edit} 
						delete={this.delete}
						add={this.add}
						title={this.props.title} 
					/>	
				</Modal>
			</aside>,
			document.body
		);

	}
}
export default ModalContent;

/*async function addResponse(selectRow){
	const url = 'add/';
	const res = await axios.post(url, selectRow)
		.then(function (response) {
			console.log(response);
			console.log(response.data);
			return response.data;
		})
		.catch(function (error) { // refactor to tell user what is wrong
			console.log(error);
			return null;
		});
	return res;
} */