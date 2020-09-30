import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import ModBody from "./ModBody";
import "./../theme.css";

// will need to refactor this
class ModalContent extends Component {
	constructor(props) {
		super(props);
		//this.setTitle = this.setTitle.bind(this);
		this.state = {
			title: "",
			titleColor: "",
			message: "",
			selectRow: this.props.selectRow,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setTitle();
	}

	// sets the state for Modal depending on whether the user clicked
	// edit or delete button
	setTitle() {
		if (this.props.title === "edit") {
			this.setState({
				title: "Edit Row",
				titleColor: "edit",
				message: null,
			});
		} else if (this.props.title === "delete") {
			this.setState({
				title: "Delete Row",
				titleColor: "delete",
				message: "Are you sure you want to delete this row?",
			});
		} else if (this.props.title === "add") {
			this.setState({
				title: "Add Row",
				titleColor: "add",
				message: null,
			});
		}
	}

	onClose = () => {
		this.props.onResponse();
	};

	delete = () => {
		this.props.onDelete();
	};

	// tells parent App.js to edit the row
	// refactor to enter send a request when promise is successful
	edit = () => {
		const updatedRow = Object.assign({}, this.state.selectRow);
		this.props.onEdit(updatedRow);
	};

	add = () => {
		this.props.onAdd(this.state.selectRow);
	};

	update = (modRow) => {
		if (this.props.title === "edit") {
			this.props.onEdit(modRow);
		} else if (this.props.title === "add") {
			this.props.onAdd(modRow);
		} else if (this.props.title === "delete") {
			this.props.onDelete();
		}
	};

	render() {
		return ReactDOM.createPortal(
			<aside>
				<Modal show={this.props.isOpen} onHide={this.onClose}>
					<Modal.Header variant="danger" closeButton onClick={this.onClose}>
						<Modal.Title className={this.state.titleColor}>
							{this.state.title}
						</Modal.Title>
					</Modal.Header>

					<ModBody
						title={this.props.title}
						selectRow={this.state.selectRow}
						message={this.state.message}
						onClose={this.onClose}
						update={this.update}
					/>
				</Modal>
			</aside>,
			document.body
		);
	}
}
export default ModalContent;
