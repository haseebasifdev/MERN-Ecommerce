import ModelWrapper from "../../../components/UI/Model";
import React from 'react'
import Input from '../../../components/UI/Input'
import { Col, Container, Row, Button } from 'react-bootstrap'
const UpdateModel=(props)=>{

    const {
        updateCategoryModel,
        updateCategoriesForm,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList

    }=props

    return(
        <ModelWrapper
                show={updateCategoryModel}
                handleClose={updateCategoriesForm}
                modelTitle={'Update Categories'}
                size="lg"
            >
                <Row>
                    <Col>
                        <h4>Expended
                    </h4>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    type='text'
                                    value={item.name}
                                    placeholder={'Category name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                /></Col>
                            <Col> <select className='form-control'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                            >
                                <option>Select Category</option>
                                {categoryList
                                    .map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option>Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>


                    )
                }
                <h4>Checked</h4>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    type='text'
                                    value={item.name}
                                    placeholder={'Category name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                /></Col>
                            <Col> <select className='form-control'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                            >
                                <option>Select Category</option>
                                {categoryList
                                    .map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option>Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>


                    )
                }

                {/* <input
                    className="form-control"
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryimage}
                /> */}

            </ModelWrapper>

    )
}

export default UpdateModel