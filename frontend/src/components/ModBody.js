import React, { Component } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import "./../modalBody.css";

// class version
class ModBody extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modRow: Object.assign({}, this.props.selectRow),
			nameError: "",
			brandError: "",
			priceError: "",
			nameStyle: "",
			brandStyle: "",
			priceStyle: "",
		};
	}
	clearErrors() {
		this.setState({ nameError: "", brandError: "", priceError: "" });
	}

	validate = () => {
		//console.log(props.title);
		let nameError = "";
		let brandError = "";
		let petError = "";
		let priceError = "";
		let nameStyle = "";
		let brandStyle = "";
		let priceStyle = "";

		//  validate name
		if (this.state.modRow.name.length < 1) {
			nameError = "Name can not be empty";
			nameStyle = "error-input";
		} else if (this.state.modRow.name.length > 20) {
			nameError = "Name must be less than 20 characters";
			nameStyle = "error-input";
		}

		// validate Brand
		if (this.state.modRow.brand.length < 1) {
			brandError = "Brand name can not be empty";
			brandStyle = "error-input";
		} else if (this.state.modRow.brand.length > 20) {
			brandError = " Brand Name must be less than 20 characters";
			brandStyle = "error-input";
		}

		// validate price
		if (isNaN(this.state.modRow.price)) {
			priceError = "Price is not a number";
			priceStyle = "error-input";
		} else if (this.state.modRow.price <= 0) {
			priceError = "Price must be greater than 0";
			priceStyle = "error-input";
		} else if (this.state.modRow.price > 1000) {
			priceError = "Price must be less than 1000";
			priceStyle = "error-input";
		}

		/*for (let e in errors) {
			if (errors[e]) {
				console.log(errors[e]);
				setErrors((errors.nameError = nameError));
				return false;
			}
		} */

		if (nameError || brandError || priceError) {
			this.setState({
				nameError,
				brandError,
				priceError,
				nameStyle,
				brandStyle,
				priceStyle,
			});
			return false;
		}
		return true;
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		const updatedRow = Object.assign({}, this.state.modRow);
		updatedRow[name] = value;
		this.setState({ modRow: updatedRow });
		//modRow[name] = value;
	};
	handleSubmit = (event) => {
		inputClass = "";
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			this.props.update(this.state.modRow);
		}
		//props.update(modRow);
	};
	display = () => {
		if (this.props.title === "edit" || this.props.title === "add") {
			return (
				<Form.Group>
					<Form.Row>
						<Form.Label xs="auto" column="sm" lg={2}>
							Name
						</Form.Label>
						<Col>
							<Form.Control
								name="name"
								size="sm"
								type="text"
								placeholder={this.props.selectRow.name}
								onChange={this.handleChange}
								className={this.state.nameStyle}
							/>
							<div className="error-msg">{this.state.nameError}</div>
						</Col>
					</Form.Row>
					<Form.Row>
						<Form.Label xs="auto" column="sm" lg={2}>
							Brand
						</Form.Label>
						<Col>
							<Form.Control
								name="brand"
								size="sm"
								type="text"
								placeholder={this.props.selectRow.brand}
								onChange={this.handleChange}
								className={this.state.brandStyle}
							/>
							<div className="error-msg">{this.state.brandError}</div>
						</Col>
					</Form.Row>
					<Form.Row>
						<Form.Label xs="auto" column="sm" lg={2}>
							Food For
						</Form.Label>
						<Col>
							<Form.Control
								name="pet"
								size="sm"
								type="text"
								placeholder={this.props.selectRow.pet}
								onChange={this.handleChange}
							/>
						</Col>
					</Form.Row>

					<Form.Row>
						<Form.Label xs="auto" column="sm" lg={2}>
							Price
						</Form.Label>
						<Col>
							<Form.Control
								name="price"
								size="sm"
								type="number"
								placeholder={this.props.selectRow.price}
								onChange={this.handleChange}
								className={this.state.priceStyle}
							/>
							<div className="error-msg">{this.state.priceError}</div>
						</Col>
					</Form.Row>
				</Form.Group>
			);
		} else if (this.props.title === "delete") {
			return (
				<Table striped bordered size="sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Brand Name</th>
							<th>Food For</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{this.props.selectRow.name}</td>
							<td>{this.props.selectRow.brand}</td>
							<td>{this.props.selectRow.pet}</td>
							<td>{this.props.selectRow.price}</td>
						</tr>
					</tbody>
				</Table>
			);
		} else {
			return null;
		}
	};

	render() {
		return (
			<div>
				<Modal.Body>
					<div>{this.display()}</div>
					<p>{this.props.message}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.onClose}>
						cancel
					</Button>
					<Button variant={this.props.btnVariant} onClick={this.handleSubmit}>
						{this.props.title}
					</Button>
				</Modal.Footer>
			</div>
		);
	}
}

export default ModBody;
