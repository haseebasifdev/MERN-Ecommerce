import ModelWrapper from "../../../components/UI/Model";
import React from 'react'
const DeleteModel = (props) => {
    const {
        deleteModel,
        colseDeleteModel,
        deleteCategories
    }=props
    return (
        <ModelWrapper
            show={deleteModel}
            handleClose={deleteCategories}
            modelTitle={'Are You Sure to Delete'}
            btn={"Delete"}
            handleclosedelModel={()=>colseDeleteModel()}

        >

        </ModelWrapper>)
}
export default DeleteModel;