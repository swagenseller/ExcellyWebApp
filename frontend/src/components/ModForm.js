import React from "react";
import { Form, Col } from "react-bootstrap";
const ModForm = (props) => {
	/*<Form {/*noValidate validated={validated} onSubmit={handleSubmit}  } >*/
	return (
		<Form.Group>
			<Form.Row>
				<Form.Label xs="auto" column="sm" lg={2}>
					Name
				</Form.Label>
				<Col>
					<Form.Control size="sm" type="text" placeholder="" />
				</Col>
			</Form.Row>
			<Form.Row>
				<Form.Label xs="auto" column="sm" lg={2}>
					Brand
				</Form.Label>
				<Col>
					<Form.Control size="sm" type="text" placeholder="" />
				</Col>
			</Form.Row>
			<Form.Row>
				<Form.Label xs="auto" column="sm" lg={2}>
					Food For
				</Form.Label>
				<Col>
					<Form.Control size="sm" type="text" placeholder="" />
				</Col>
			</Form.Row>

			<Form.Row>
				<Form.Label xs="auto" column="sm" lg={2}>
					Price
				</Form.Label>
				<Col>
					<Form.Control size="sm" type="number" placeholder="" />
				</Col>
			</Form.Row>
		</Form.Group>
	);
};
export default ModForm;
