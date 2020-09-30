import React from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";

// displays the Modal.body elements based on props.title
const ModBody = (props) => {
	let display = null;
	const modRow = Object.assign({}, props.selectRow);

	const handleChange = (event) => {
		const { name, value } = event.target;
		modRow[name] = value;
	};
	const handleSubmit = () => {
		props.update(modRow);
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
						/>
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
				<Button variant="primary" onClick={handleSubmit}>
					{props.title}
				</Button>
			</Modal.Footer>
		</div>
	);
};

export default ModBody;
