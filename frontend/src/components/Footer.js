import React from 'react';
import { Button, Modal} from 'react-bootstrap';

// displays the Modal.Footer buttons based on props.title
const Footer = (props) => {
    if(props.title ==="edit"){
        return(
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>cancel</Button>
                <Button variant="primary" onClick={props.edit}>Edit</Button>
            </Modal.Footer>
        );
    } else if(props.title ==="delete"){
        return(
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>cancel</Button>
                <Button variant="danger" onClick={props.delete}>delete</Button>
            </Modal.Footer>
        );
    } else if(props.title ==="add"){
        return(
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>cancel</Button>
                <Button variant="success" onClick={props.add}>add</Button>
            </Modal.Footer>
        );
    }else{
        // change with an error message?
        return null;
    }
   
}


export default Footer; 