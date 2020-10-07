import React from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import "./../modalBody.css";

// displays the Modal.body elements based on props.title
// add hooks to this component
const ModBody = (props) => {
	let display = null;
	const modRow = Object.assign({}, props.selectRow);
	const errors = {
		nameError: "",
		brandError: "",
		priceError: "",
	};
	let inputClass = "";

	const clearErrors = () => {
		for (let e in errors) {
			errors[e] = "";
		}
	};

	const validate = () => {
		/*let nameError = "";
		let brandError = "";
		let petError = "";
		let priceError = ""; */

		//  validate name
		if (modRow.name.length < 1) {
			errors.nameError = "Name can not be empty";
		} else if (modRow.name.length > 20) {
			errors.nameError = "Name must be less than 20 characters";
		}

		// validate Brand
		if (modRow.brand.length < 1) {
			errors.brandError = "Name can not be empty";
		} else if (modRow.brand.length > 20) {
			errors.brandError = "Name must be less than 20 characters";
		}

		// validate price
		if (isNaN(modRow.price)) {
			errors.priceError = "Price is not a number";
		} else if (modRow.price <= 0) {
			errors.priceError = "Price must be greater than 0";
		} else if (modRow.price < 1000) {
			errors.priceError = "Price must be less than 1000";
		}

		for (let e in errors) {
			if (errors[e]) {
				return false;
			}
		}
		return true;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		modRow[name] = value;
	};
	const handleSubmit = () => {
		if (validate()) {
			props.update(modRow);
		} else {
			// don't close the modal
			inputClass = "error-input";
		}
		//props.update(modRow);
	};

	if (props.title === "edit" || props.title === "add") {
		display = (
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
							placeholder={props.selectRow.name}
							onChange={handleChange}
							className={inputClass}
						/>
						<div>{errors.name}</div>
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
							placeholder={props.selectRow.brand}
							onChange={handleChange}
						/>
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
							placeholder={props.selectRow.pet}
							onChange={handleChange}
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
							placeholder={props.selectRow.price}
							onChange={handleChange}
						/>
						<div>{errors.price}</div>
					</Col>
				</Form.Row>
			</Form.Group>
		);
	} else if (props.title === "delete") {
		display = (
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
						<td>{props.selectRow.name}</td>
						<td>{props.selectRow.brand}</td>
						<td>{props.selectRow.pet}</td>
						<td>{props.selectRow.price}</td>
					</tr>
				</tbody>
			</Table>
		);
	}

	return (
		<div>
			<Modal.Body>
				<p>{props.message}</p>
				{display}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onClose}>
					cancel
				</Button>
				<Button variant={props.btnVariant} onClick={handleSubmit}>
					{props.title}
				</Button>
			</Modal.Footer>
		</div>
	);
};

export default ModBody;
