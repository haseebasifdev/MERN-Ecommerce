import ModelWrapper from "../../../components/UI/Model";
import React from 'react'
import Input from '../../../components/UI/Input'
import { Col, Row } from "react-bootstrap";
const DeleteModel = (props) => {

    const {
        show,
        AddNewCategory,
        setcategoryName,
        setparentCategoryId,
        createcategoryList,
        handleCategoryimage,
        categoryName,
        parentCategoryId,
        categoryList
    } = props
    return (
        <ModelWrapper
            show={show}
            handleClose={AddNewCategory}
            modelTitle={'Add New Category'}

        >
            <Row>
                <Col>  <Input
                    type='text'
                    value={categoryName}
                    placeholder={'Category name'}
                    onChange={(e) => setcategoryName(e.target.value)}
                /></Col>
                <Col>
                    <select className='form-control'
                        value={parentCategoryId}
                        onChange={e => setparentCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {categoryList.map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                        }
                    </select></Col>
            </Row>
            <Row>
                <Col> <input
                    className="form-control"
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryimage}
                />
                </Col>
            </Row>




        </ModelWrapper>


    )
}

export default DeleteModel;