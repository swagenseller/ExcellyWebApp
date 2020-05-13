import React from 'react';
import { Table , Modal} from 'react-bootstrap';

// displays the Modal.body elements based on props.title
const ModBody = (props) => {
    let display = null;
    if(props.title === 'edit' || props.title === 'add'){
      display = (
				<ul>
					<li>
					<span>Name:</span>
						<input 
							type="text" 
							maxLength="100" 
							minLength="1" 
							name="name"
							value={props.selectRow.name}
							onChange={props.handleChange}
						/>
					</li>
					<li>
						<span>Brand:</span>
						<input 
							type="text" 
							maxLength="100" 
							minLength="1" 
							name="brand"
							value={props.selectRow.brand}
							onChange={props.handleChange}
						/>
					</li>
					<li>
						<span>Pet:  </span>
						<input 
							type="text"  
						  maxLength="10" 
							minLength="1"
							name="pet"
							value={props.selectRow.pet}
							onChange={props.handleChange}
						/>
					</li>
						<li>
							<span>Price:</span>
							<input 
								type="number" 
								step="0.01" 
								max="999.99" 
								min="0" 
								name="price"
								value={props.selectRow.price}
								onChange={props.handleChange}
							/>
						</li>	
				</ul>
			);
	}/*else if(props.title === 'add'){
		display = (
				  <ul>
					  <li>
					  <span>Name:</span>
						  <input 
							  type="text" 
							  maxLength="100" 
							  minLength="1" 
							  name="name"
							  value=''
							  onChange={props.handleChange}
						  />
					  </li>
					  <li>
						  <span>Brand:</span>
						  <input 
							  type="text" 
							  maxLength="100" 
							  minLength="1" 
							  name="brand"
							  value=''
							  onChange={props.handleChange}
						  />
					  </li>
					  <li>
						  <span>Pet:  </span>
						  <input 
							  type="text"  
							maxLength="10" 
							  minLength="1"
							  name="pet"
							  value=''
							  onChange={props.handleChange}
						  />
					  </li>
						  <li>
							  <span>Price:</span>
							  <input 
								  type="number" 
								  step="0.01" 
								  max="999.99" 
								  min="0" 
								  name="price"
								  value='0'
								  onChange={props.handleChange}
							  />
						  </li>	
				  </ul>
			  );
	  } */else if (props.title === 'delete'){
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
							<td>
								{props.selectRow.name}
							</td>
							<td>
								{props.selectRow.brand}
							</td>
							<td>
								{props.selectRow.pet}
							</td>
							<td>
								{props.selectRow.price}
							</td>
						</tr>
					</tbody>
				</Table>
			);
		}

		return (
			<Modal.Body>
				<p>{props.message}</p>
				{display}
			</Modal.Body>
		);
};

export default ModBody;