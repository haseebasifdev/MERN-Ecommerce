import React from 'react'
import { Button, Modal } from "react-bootstrap";
import Input from '../Input';
function ModelWrapper(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modelTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {props.children}

            </Modal.Body>
            <Modal.Footer>

                <Button className=" btn-sm" variant={props.btn? "danger":"primary"} onClick={props.handleClose}>
                   {props.btn? props.btn:'Save Changes'} 
                </Button>
                {props.btn ? 
                <Button className=" btn-sm" variant="primary" onClick={props.handleclosedelModel}>
                    Cancle 
                 </Button>   :
                 '' 
            }
            </Modal.Footer>
        </Modal>
    )
}

export default ModelWrapper
