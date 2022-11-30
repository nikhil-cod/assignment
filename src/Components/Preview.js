import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../Redux/action";

function Preview() {
  const show_modal = useSelector((state) => state.appReducer.show_modal);
  const previewData = useSelector((state) => state.appReducer.preview_data);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({
      type: actions.SHOW_MODAL,
      data: false,
    });
  };

  //   const handleShow=()=>{
  //     dispatch({
  //         type: actions.SHOW_MODAL,
  //         data: true,
  //       });
  //   }
  return (
    <>
      {/* <Button variant="primary" onClick={show_modal}>
        Launch demo modal
      </Button> */}

      <Modal show={show_modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{previewData.templatename}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{previewData.fieldLabel.value} 
         { previewData.fieldLabel.required && <span>*</span>}</h3> 
         {previewData.displayElement=="dropdown_field"? <select class="form-select" aria-label="Default select example">
            {previewData.fieldData.map((item) => {
              return <option>{item.value}</option>;
            })}
          </select>
          :<h5>
            {previewData.fieldData[0]}
          </h5>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Preview;
